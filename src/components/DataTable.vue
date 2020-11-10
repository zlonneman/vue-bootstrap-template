<template>
  <div>
    <div v-if="globalSearch" class="search-input-container">
      <input class="search-input form-control" placeholder="Search" :value="displaySearchValue" @input="updateSearchValue">
    </div>
    <div class="table-container" :style="getTableContainerStyles()">
      <div class="loading-modal" v-show="loading"  :style="getLoadingModalStyles()">
        <div class="spinner-container">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
      <div class="header-container">
        <div v-for="(header, index) in headers" :key="'header-row-' + header.value" ref="header-row" :style="[getColumnStyles(header, index), {width: `${columnWidth[index]}%`}]" class="table-column">
          <div :style="getHeaderCellStyles(header)" class="header-cell">
            {{header.text}}
          </div>
        </div>
      </div>
      <div class="grid-container" :key="dataTableUpdateKey">
        <div v-for="(header,index) in headers" :key="'grid-row-' + header.value" :style="[getColumnStyles(header, index), {width: `${columnWidth[index]}%`}]" class="table-column">
          <!-- <div :style="getHeaderCellStyles(header)" class="header-cell">
            {{header.text}}
          </div> -->
          <template v-if="!inlineEditing">
            <div v-for="(row, rowIndex) in computedDataSource" :key="`row-${rowIndex}`" :style="getDataCellStyles(header)" class="data-cell">
                {{row[header.value]}}
            </div>
          </template>
          <template v-if="inlineEditing">
            <template v-if="!header.type || header.type.toLowerCase() === 'text'">
              <cell-text-input v-for="(row, rowIndex) in computedDataSource" :key="`row-${rowIndex}`" v-model="computedDataSource[rowIndex][header.value]" :cellStyleObject="getDataCellStyles(header)" :inputStyleObject="getDataCellInputStyles(header)" />
            </template>
            <template v-else-if="header.type.toLowerCase() === 'number'">
              <cell-number-input v-for="(row, rowIndex) in computedDataSource" :key="`row-${rowIndex}`" v-model="computedDataSource[rowIndex][header.value]" :cellStyleObject="getDataCellStyles(header)" :inputStyleObject="getDataCellInputStyles(header)" />
            </template>
            <template v-else-if="header.type.toLowerCase() === 'usd'">
              <cell-u-s-d-input v-for="(row, rowIndex) in computedDataSource" :key="`row-${rowIndex}`" v-model="computedDataSource[rowIndex][header.value]" :cellStyleObject="getDataCellStyles(header)" :inputStyleObject="getDataCellInputStyles(header)" />
            </template>
            <template v-else-if="header.type.toLowerCase() === 'usd'">
              <cell-percent-input v-for="(row, rowIndex) in computedDataSource" :key="`row-${rowIndex}`" v-model="computedDataSource[rowIndex][header.value]" :cellStyleObject="getDataCellStyles(header)" :inputStyleObject="getDataCellInputStyles(header)" />
            </template>
          </template>
        </div>
      </div>
      <div class="summary-container" :key="summaryTableUpdateKey" :style="getSummaryContainerStyles()">
        <div v-for="(header, index) in headers" :key="'summary-row-' + header.value" :style="[getColumnStyles(header, index), {width: `${columnWidth[index]}%`}]" class="table-column">
          <div v-if="includeSummaryRow" :style="getDataCellStyles(header)" class="data-cell">
            {{ getSummaryData(header)}}
          </div>
        </div>
      </div>
      <div v-if="enablePagination" class="pagination">
        <div class="page-size-selector">
          <div v-for="pageSizeOption in pageSizeOptions" :key="'page-size-' + pageSizeOption" @click="updatePageSize(pageSizeOption)" :class="pageSizeOption === pageSize ? 'selected-page-size': null" class='btn'>{{pageSizeOption}}</div>
        </div>
        
        <div class="page-selector">
          <div class="page-info-display">Page {{currentPage}} (of {{pageCount}})</div>
          <div class="page-info-display">(Count: {{searchFilteredDataSource.length}})</div>
          <div class="page-nav">
            <div class="btn" @click="firstPage">First</div>
            <div class="btn" @click="prevPage">-</div>
            <input class="current-page-input" @change="updatePageNumber" :value="currentPage"/>
            <div class="btn" @click="nextPage">+</div>
            <div class="btn" @click="lastPage">last</div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CellTextInput                           from '../components/DataTableCellTypes/CellTextInput.vue';
import CellNumberInput                           from '../components/DataTableCellTypes/CellNumberInput.vue';
import CellUSDInput                           from '../components/DataTableCellTypes/CellUSDInput.vue';
import CellPercentInput                           from '../components/DataTableCellTypes/CellPercentInput.vue';

import { debounce }                                from '../modules/helpers.js';

export default {
name: 'DataTable',
components: {
  CellTextInput,
  CellNumberInput,
  CellUSDInput,
  CellPercentInput,
},
props: {
  headers: {
    type: Array,
    default: () => []
  },
  dataSource: {
    type: Array,
    default: () => []
  },
  inlineEditing: {
    type: Boolean,
    default: false,
  },
  includeSummaryRow: {
    type: Boolean,
    default: false,
  },
  summaryType:{
    type: String,
    default: 'All' //options: total or page
  },
  enablePagination: {
    type: Boolean,
    default: false,
  },
  initialPageSize: {
    type: Number,
    default: 10,
  },
  pageSizeOptions:{
    type: Array,
    default: () => [10, 20, 30]
  },
  cellInputType: {
    type: String,
    default: 'text'
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  borderColor: {
    type: String,
    default: 'black'
  },
  borderWidth: {
    type: String,
    default: '1px'
  },
  borderStyle: {
    type: String,
    default: 'solid'
  },
  columnLines: {
    type: Boolean,
    default: true,
  },
  rowLines: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '500px'
  },

  //Cell Styles
  cellFontSize: {
    type: String,
    default: '12px'
  },
  cellColor: {
    type: String,
    default: 'black'
  },
  cellPadding: {
    type: String,
    default: '5px'
  },
  cellHeight: {
    type: String,
    default: '36px'
  },
  cellOverflow:{
    type: String,
    default: 'hidden'
  },

  //Header Styles
  headerFontSize: {
    type: String,
    default: '16px'
  },
  headerCellColor: {
    type: String,
    default: 'black'
  },
  headerPadding: {
    type: String,
    default: '5px'
  },
  headerHeight: {
    type: String,
    default: '36px'
  },
  headerOverflow:{
    type: String,
    default: 'hidden'
  },

  //Seach Styles
  globalSearch: {
    type: Boolean,
    default: false,
  },
  searchWidth: {
    type: String,
    default: '100%'
  }
  
},
provide: function(){
  return {    parentHeaders: this.headers}
},
data(){
  return {
    dataTableUpdateKey:0,
    summaryTableUpdateKey: 1000,
    currentPage:1,
    pageSize: 0,
    columnWidth: [],
    searchFilter: '',
    displaySearchValue: '',
    timerId: null,
    loading: false,
  }
},
methods: {
  debounce(func, wait) {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(func, wait)
  },
  updateSearchValue($event){
    this.displaySearchValue = $event.target.value;
    this.loading = true;
    this.debounce(() => {
        this.searchFilter = this.displaySearchValue;
    }, 400)
  },
  updatePageSize(pageSize){
    this.pageSize = pageSize;
  },
  updatePageNumber($event){
    this.currentPage = $event.target.value;
  },
  firstPage(){
    this.currentPage = 1;
  }, 
  prevPage(){
    if(this.currentPage > 1) this.currentPage--;
  },
  nextPage(){
    if(this.currentPage < this.pageCount) this.currentPage++;
  },
  lastPage(){
    this.currentPage = this.pageCount;
  },
  updateDataTable(){
    this.dataTableUpdateKey++;
    this.summaryTableUpdateKey++;
  },
  getJustification(alignment){
    switch(alignment){
      case 'right':
        return 'flex-end';
        break;
      case 'left':
        return 'flex-start';
        break;
      case 'center':
        return 'center';
        break;
      default:
        return 'flex-start';
        break;
    }
  },
  getDataCellStyles(header){
    let styles = {};
    let styleElements = ['align']
    styleElements.forEach((element,index) => {
      if(element === 'align'){
        styles['justify-content'] = this.getJustification(header[element])
      }

    })
    styles['overflow'] = this.cellOverflow;
    styles['font-size'] = this.cellFontSize;
    styles['color'] = this.cellColor;
    styles['min-height'] = this.cellHeight;
    styles['max-height'] = this.cellHeight;
    styles['padding'] = this.cellPadding;
    styles['align-items'] = 'center';
    styles['border-bottom-style'] = this.rowLines ? this.borderStyle : 'none';
    styles['border-bottom-width'] = this.rowLines ? this.borderWidth : 'none';
    styles['border-bottom-color'] = this.rowLines ? this.borderColor : 'none';
    styles['border-right-style'] = this.columnLines ? this.borderStyle : 'none';
    styles['border-right-width'] = this.columnLines ? this.borderWidth : 'none';
    styles['border-right-color'] = this.columnLines ? this.borderColor : 'none';
    // console.log('data-cell styles', styles);
    return styles;
  },
  getDataCellInputStyles(header){
    let styles = {};
    let styleElements = ['align']
    styleElements.forEach((element,index) => {
      if(element === 'align'){
        styles['text-align'] = header[element] ? header[element] : 'left'
      }
    })
    styles['overflow'] = this.cellOverflow;
    styles['font-size'] = this.cellFontSize;
    styles['color'] = this.cellColor;
    styles['min-height'] = this.cellHeight;
    // styles['max-height'] = this.cellHeight;
    styles['padding'] = this.cellPadding;
    styles['align-items'] = 'center';
    styles['border-bottom-style'] = this.rowLines ? this.borderStyle : 'none';
    styles['border-bottom-width'] = this.rowLines ? this.borderWidth : 'none';
    styles['border-bottom-color'] = this.rowLines ? this.borderColor : 'none';
    styles['border-right-style'] = this.columnLines ? this.borderStyle : 'none';
    styles['border-right-width'] = this.columnLines ? this.borderWidth : 'none';
    styles['border-right-color'] = this.columnLines ? this.borderColor : 'none';
    // console.log('data-cell styles', styles);
    return styles;
  },
  getHeaderCellStyles(header){
    let styles = {};
    let styleElements = ['align']
    styleElements.forEach((element,index) => {
      if(element === 'align'){
        styles['justify-content'] = this.getJustification(header[element])
      }
    })
    styles['overflow'] = this.headerOverflow;
    styles['font-size'] = this.headerFontSize;
    styles['color'] = this.headerCellColor;
    styles['min-height'] = this.headerHeight;
    styles['max-height'] = this.headerHeight;
    styles['padding'] = this.headerPadding;
    styles['align-items'] = 'center';
    styles['border-bottom-style'] = this.rowLines ? this.borderStyle : 'none';
    styles['border-bottom-width'] = this.rowLines ? this.borderWidth : 'none';
    styles['border-bottom-color'] = this.rowLines ? this.borderColor : 'none';
    styles['border-right-style'] = this.columnLines ? this.borderStyle : 'none';
    styles['border-right-width'] = this.columnLines ? this.borderWidth : 'none';
    styles['border-right-color'] = this.columnLines ? this.borderColor : 'none';
    // console.log('header-cell styles', styles);
    return styles;
  },
  getColumnStyles(header, index){
    let styles = {};
    if(header['width']){
      styles['min-width'] = header['width'];
      styles['max-width'] = header['width'];
    }
    return styles;
  },
  getContainerStyles(){
    let styles = {};
    styles['width'] = this.width;
    styles['height'] = this.height;
    styles['border-style'] = this.bordered ? this.borderStyle : 'none';
    styles['border-width'] = this.bordered ? this.borderWidth : 'none';
    styles['border-color'] = this.bordered ? this.borderColor : 'none';
    // console.log('table-contianer styles', styles);
    return styles;
  },
  getSearchContainerStyles(){
    let styles = {};
    styles['width'] = this.searchWidth;
    return styles;
  },
  getContainerStyles(){
    let styles = {};
    styles['width'] = this.width;
    styles['height'] = this.height;
    styles['border-style'] = this.bordered ? this.borderStyle : 'none';
    styles['border-width'] = this.bordered ? this.borderWidth : 'none';
    styles['border-color'] = this.bordered ? this.borderColor : 'none';
    // console.log('table-contianer styles', styles);
    return styles;
  },
  getSummaryContainerStyles(){
    let styles = {};
    styles['border-top-style'] = this.rowLines ? this.borderStyle : 'none';
    styles['border-top-width'] = this.rowLines ? this.borderWidth : 'none';
    styles['border-top-color'] = this.rowLines ? this.borderColor : 'none';
    // console.log('table-contianer styles', styles);
    return styles;
  },
  getTableContainerStyles(){
    let styles = {};
    styles['width'] = this.width;
    styles['height'] = this.height;
    styles['border-style'] = this.bordered ? this.borderStyle : 'none';
    styles['border-width'] = this.bordered ? this.borderWidth : 'none';
    styles['border-color'] = this.bordered ? this.borderColor : 'none';
    // console.log('table-contianer styles', styles);
    return styles;
  },
  getLoadingModalStyles(){
    let styles = {};
    styles['height'] = this.height;
    return styles;
  },
  getSummaryData(header){
    let data = this.summaryType.toLowerCase() === 'page' ? this.computedDataSource : this.dataSource;
    let arrayOfColumnValues = data.map((row) => {
      return row[header.value]  
    })
    let columnSummary = header.summaryFunction ? header.summaryFunction(arrayOfColumnValues) : 'no fxn included';
    return columnSummary;
  },
},
computed: {
  searchFilteredDataSource(){
    this.loading = false;
    if(!this.searchFilter) return this.dataSource
    let filteredDataSource = this.dataSource.filter(row => {
      let rowIncludesInstanceOfSearchFilter = false;
      if(!this.headers) return false;
      this.headers.forEach(header => {
        let dataToCheck = row[header.value];
        if(typeof(dataToCheck) !== 'string'){
          dataToCheck = dataToCheck.toString();
        }
        dataToCheck = dataToCheck.toLowerCase();
        if(dataToCheck && dataToCheck.includes(this.searchFilter.toLowerCase())){
          rowIncludesInstanceOfSearchFilter = true;
          return true;
        }
      })
      return rowIncludesInstanceOfSearchFilter;
    })
    return filteredDataSource;
  },
  computedDataSource(){
    let startingNumber = (this.currentPage-1)*this.pageSize;
    let endingNumber = startingNumber + this.pageSize;
    let sortedDataSource = this.searchFilteredDataSource;
    
    return sortedDataSource.slice(startingNumber, endingNumber)
  },
  pageCount(){
    return Math.ceil(this.dataSource.length / this.pageSize)
  }
},
mounted(){
  let totalWidth = 0
  this.$refs['header-row'].forEach(header => {
    this.columnWidth.push(header.firstChild.clientWidth);
    totalWidth += header.firstChild.clientWidth;
  })
  this.columnWidth = this.columnWidth.map(column => {
    return (column / totalWidth) * 100
  })
  this.updateDataTable();
},
created(){
  this.pageSize=this.enablePagination ? this.initialPageSize : this.dataSource.length;
}

}
</script>
<style lang="scss" scoped>
  .search-input-container{
    margin: 5px 0px;
    .search-input{
      color: $primary;
      width: 100%;
    }
  }
  .table-container{
    display: flex;
    flex-direction: column;
    border-color: $primary;
    .loading-modal {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      // top: 50%;
      // left: 50%;
      // -webkit-transform: translate(-50%, -50%);
      // -moz-transform: translate(-50%, -50%);
      // -ms-transform: translate(-50%, -50%);
      // -o-transform: translate(-50%, -50%);
      // transform: translate(-50%, -50%);
      background-color: $brand-grey;
      opacity: .75;
      width: calc(100% - 32px);
      z-index: 12000;
    }
    .spinner-container {
      text-align: center;
      // padding-top: 50vh;
    }
    .spinner-border {
      color: $primary;
    }
    .header-container{
      display: flex;
      .table-column{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        // white-space: nowrap;
        .header-cell {
          display: flex;
          flex-grow: 1;
        }
      }
    }
    .grid-container{
      overflow: scroll;
      display: flex;
      flex-grow: 1;
      
      .table-column{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        // white-space: nowrap;
        // .header-cell {
        //   display: flex;
        //   flex-grow: 1;
        // }
        .data-cell {
          display: flex;
          flex-grow: 1;
          &--input{
            margin: 0px;
            background-color: transparent;
            padding: 0px;
            width: 100%;
            border: none;
          }
        }
      }
    }
    .summary-container{
      display: flex;
      background-color: lighten($secondary, 20);
      .table-column{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        // white-space: nowrap;
        .data-cell {
          display: flex;
          flex-grow: 1;
        }
      }
    }
    .pagination{
      display: flex;
      justify-content: space-between;
      margin: 2px;
      .btn:hover{
        background-color: $secondary;
        color: white;
        // border: solid 1px $secondary;
      }
      .page-size-selector{
        .selected-page-size{
          background-color: $secondary;
          color: white;
        }
      }
      
      .page-selector{
        display: flex;
        align-items: center;
        justify-content: center;
        .page-info-display{
          margin-right: 20px;
        }
        .page-nav{
          .btn{
            margin: 0px 2px;
          }
          .current-page-input{
            max-width: 40px;
            text-align: right;
            border-color: $secondary;
            background-color: lighten($secondary, 35)
          }
        }
      }
    }
  }
</style>