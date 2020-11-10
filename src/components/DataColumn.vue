<template v-slot="slotProps">
  <div class="p-0 m-0"> {{slotProps}}
      <div :style="getHeaderCellStyles(header)" class="header-cell">
        {{header.text}}
      </div>
      <template v-if="!inlineEditing">
        <div v-for="(row, rowIndex) in dataSource" :key="`row-${rowIndex}`" :style="getDataCellStyles(header)" class="data-cell">
            {{row[header.value]}}
        </div>
      </template>
      <template v-if="inlineEditing">
        <template v-if="!header.type || header.type.toLowerCase() === 'text'">
          <cell-text-input v-for="(row, rowIndex) in dataSource" :key="`row-${rowIndex}`" v-model="dataSource[rowIndex][header.value]" :cellStyleObject="getDataCellStyles(header)" :inputStyleObject="getDataCellInputStyles(header)" />
        </template>
        <template v-else-if="header.type.toLowerCase() === 'number'">
          <cell-number-input v-for="(row, rowIndex) in dataSource" :key="`row-${rowIndex}`" v-model="dataSource[rowIndex][header.value]" :cellStyleObject="getDataCellStyles(header)" :inputStyleObject="getDataCellInputStyles(header)" />
        </template>
        <template v-else-if="header.type.toLowerCase() === 'usd'">
          <cell-u-s-d-input v-for="(row, rowIndex) in dataSource" :key="`row-${rowIndex}`" v-model="dataSource[rowIndex][header.value]" :cellStyleObject="getDataCellStyles(header)" :inputStyleObject="getDataCellInputStyles(header)" />
        </template>
        <template v-else-if="header.type.toLowerCase() === 'usd'">
          <cell-percent-input v-for="(row, rowIndex) in dataSource" :key="`row-${rowIndex}`" v-model="dataSource[rowIndex][header.value]" :cellStyleObject="getDataCellStyles(header)" :inputStyleObject="getDataCellInputStyles(header)" />
        </template>
        
      </template>
      
  </div>
  
</template>

<script>
import CellTextInput                           from '../components/DataTableCellTypes/CellTextInput.vue';
import CellNumberInput                           from '../components/DataTableCellTypes/CellNumberInput.vue';
import CellUSDInput                           from '../components/DataTableCellTypes/CellUSDInput.vue';
import CellPercentInput                           from '../components/DataTableCellTypes/CellPercentInput.vue';

export default {
name: 'DataColumn',
components: {
  CellTextInput,
  CellNumberInput,
  CellUSDInput,
  CellPercentInput,
},
// props: {
//   headers: {
//     type: Object,
//     default: () => []
//   },
//   dataSource: {
//     type: Array,
//     default: () => []
//   },
//   inlineEditing: {
//     type: Boolean,
//     default: false,
//   },
//   cellInputType: {
//     type: String,
//     default: 'text'
//   },
//   bordered: {
//     type: Boolean,
//     default: true,
//   },
//   borderColor: {
//     type: String,
//     default: 'black'
//   },
//   borderWidth: {
//     type: String,
//     default: '1px'
//   },
//   borderStyle: {
//     type: String,
//     default: 'solid'
//   },
//   columnLines: {
//     type: Boolean,
//     default: true,
//   },
//   rowLines: {
//     type: Boolean,
//     default: true,
//   },
//   width: {
//     type: String,
//     default: '100%'
//   },
//   // maxWidth: {
//   //   type: String,
//   //   default: '400px'
//   // },
//   cellFontSize: {
//     type: String,
//     default: '12px'
//   },
//   cellColor: {
//     type: String,
//     default: 'black'
//   },
//   cellPadding: {
//     type: String,
//     default: '5px'
//   },
//   cellHeight: {
//     type: String,
//     default: '36px'
//   },
//   headerFontSize: {
//     type: String,
//     default: '16px'
//   },
//   headerCellColor: {
//     type: String,
//     default: 'black'
//   },
//   headerPadding: {
//     type: String,
//     default: '5px'
//   },
//   headerHeight: {
//     type: String,
//     default: '36px'
//   },
  
// },
inject: {
  headers: 'headers',
},
data(){
  return {
  }
},
methods: {
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
    styles['font-size'] = this.cellFontSize;
    styles['color'] = this.cellColor;
    styles['min-height'] = this.cellFontSize;
    styles['height'] = this.cellHeight;
    styles['padding'] = this.cellPadding;
    styles['align-items'] = 'center';
    styles['border-bottom-style'] = this.rowLines ? this.borderStyle : 'none';
    styles['border-bottom-width'] = this.rowLines ? this.borderWidth : 'none';
    styles['border-bottom-color'] = this.rowLines ? this.borderColor : 'none';
    // console.log('data-cell styles', styles);
    return styles;
  },
  getDataCellInputStyles(header){
    let styles = {};
    let styleElements = ['align']
    console.log('header - getDataCellInputStyle', header)
    styleElements.forEach((element,index) => {
      if(element === 'align'){
        styles['text-align'] = header[element] ? header[element] : 'left'
      }
    })
    styles['font-size'] = this.cellFontSize;
    styles['color'] = this.cellColor;
    styles['min-height'] = this.cellFontSize;
    styles['height'] = this.cellHeight;
    styles['padding'] = this.cellPadding;
    styles['align-items'] = 'center';
    styles['border-bottom-style'] = this.rowLines ? this.borderStyle : 'none';
    styles['border-bottom-width'] = this.rowLines ? this.borderWidth : 'none';
    styles['border-bottom-color'] = this.rowLines ? this.borderColor : 'none';
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
    styles['font-size'] = this.headerFontSize;
    styles['color'] = this.headerCellColor;
    styles['min-height'] = this.headerFontSize;
    styles['height'] = this.headerHeight;
    styles['padding'] = this.headerPadding;
    styles['align-items'] = 'center';
    styles['border-bottom-style'] = this.rowLines ? this.borderStyle : 'none';
    styles['border-bottom-width'] = this.rowLines ? this.borderWidth : 'none';
    styles['border-bottom-color'] = this.rowLines ? this.borderColor : 'none';
    // console.log('header-cell styles', styles);
    return styles;
  },
  getColumnStyles(header){
    let styles = {};
    let styleElements = ['width']
    styleElements.forEach((element,index) => {
      if(header[element]){
        styles[element] = header[element];
      }
    })
    
    styles['border-right-style'] = this.columnLines ? this.borderStyle : 'none';
    styles['border-right-width'] = this.columnLines ? this.borderWidth : 'none';
    styles['border-right-color'] = this.columnLines ? this.borderColor : 'none';
    // console.log('column styles', styles);
    return styles;
  },
  getTableContainerStyles(){
    let styles = {};
    styles['width'] = this.width;
    // styles['max-width'] = this.maxWidth;
    styles['border-style'] = this.bordered ? this.borderStyle : 'none';
    styles['border-width'] = this.bordered ? this.borderWidth : 'none';
    styles['border-color'] = this.bordered ? this.borderColor : 'none';
    // console.log('table-contianer styles', styles);
    return styles;
  }
},
computed: {
  
},
mounted(){
}
}
</script>
<style lang="scss" scoped>
  .table-container{
    overflow-x: scroll;
    display: flex;
    border-color: $primary;
    .table-column{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      white-space: nowrap;
      .header-cell {
        display: flex;
        flex-grow: 1;
      }
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
</style>