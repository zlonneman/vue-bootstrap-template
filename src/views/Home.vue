<template>
  <div class="grid-container">
    <div class="card cell-1 p-3">
      <TextInput v-model="textInputValue" label="Text Input" />
      <p class="value-text">{{textInputValue}}</p>
    </div>
    <div class="card cell-2 p-3">
      <Dropdown label="Dropdown" :alphabetize="false" :options="options" v-model="dropdownValue"/>
      <p class="value-text">{{dropdownValue}}</p>
    </div>
    <div class="card cell-3 p-3">
      <Combobox label="Combobox" :options="options" v-model="comboboxValue"/>
      <p class="value-text">{{comboboxValue}}</p>
    </div>
    <div class="card cell-4 p-3">
      <Autocomplete label="Autocomplete" :options="options" v-model="autocompleteValue"/>
      <p class="value-text">{{autocompleteValue}}</p>
    </div>
    <div class="card cell-5 p-3">
      <div class="header">Table One</div>
      <DataTable 
        :headers="headers" 
        :dataSource="dataSource"
        :enablePagination="true"
        :includeSummaryRow="true"
        :rowLines="true"
        :columnLines="true"
        summaryType="total"
        :globalSearch="true"
        :initialPageSize="50"
        :pageSizeOptions="[50, 100, 200]"
        :inlineEditing="true">
      </DataTable>
    </div>
    <div class="card cell-6 p-3">
      <div class="header">Table Two</div>
      <DataTable 
        :headers="headers" 
        :dataSource="dataSource"
        :bordered="true"
        :columnLines="false"
        :includeSummaryRow="true"
        :rowLines="true"
        cellColor="green"
        headerCellColor='green'
        cellFontSize="14px"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import DataColumn from '../components/DataColumn.vue';
import faker from 'faker';
export default {
  name: 'Home',
  components:{
    DataColumn,
  },
  data() {
    return {
      textInputValue: '',
      autocompleteValue: null,
      comboboxValue: null,
      dropdownValue: null,
      options: [{text: 'None', value: null}, {text: 'Possible 1', value: "Poss1"},{text: 'Option 1', value: 'Op1'},{text: 'Option 2', value: "Op2"}],
      headers: [
        {text: 'Customer', width: '500px', value: 'customer', type: 'text', summaryFunction: () => {return 'Summary' }}, 
        {text: 'Age', align:'right', value: 'age', type: "number", summaryFunction: this.ageSummaryFunction},
        {text: 'Total Purchases', align:'right', value: 'purchaseCount', type: 'number', summaryFunction: this.purchaseCountSummaryFunction},
        {text: 'Total Profit', align: 'right', type:'usd', value: 'totalProfit', summaryFunction: this.totalProfitSummaryFunction}],
      dataSource: []
    }
  },
  methods: {
    ageSummaryFunction(dataArray){
      let returnValue=0;
      dataArray.forEach(value => {
        returnValue += Number(value);
      })
      return `Avg Age: ${Math.round((Number(returnValue) / dataArray.length))}`
    },
    totalProfitSummaryFunction(dataArray){
      let returnValue=0;
      dataArray.forEach(value => {
        returnValue += Number(value);
      })
      return `Total: $${(Number(returnValue)).toFixed(2)} - Avg $/customer:${(Number(returnValue)/dataArray.length).toFixed(2)}`
    },
    purchaseCountSummaryFunction(dataArray){
      let returnValue=0;
      dataArray.forEach(value => {
        returnValue += Number(value);
      })
      return `${(Number(returnValue)).toFixed(2)}`
    }
  },
  created(){
    console.log('faker', faker.name.findName() )
    let data = []
    for(let i=0; i < 10000; i++){
      data.push({
        customer: faker.name.findName(),
        age: Math.round(Math.random() * 100),
        purchaseCount: Math.round(Math.random() * 10),
        totalProfit: faker.finance.amount()
      })
      
    }
    this.dataSource = data;
  }
}
</script>
<style lang="scss" scoped>
  .value-text{
    display: flex;
    justify-content: flex-end;
    align-content: center;
  }
  .grid-container{
    .card {
      margin: 10px;
    }
    .cell-1 {
      grid-area: cell-1;
    }
    .cell-2 {
      grid-area: cell-2;
    }
    .cell-3 {
      grid-area: cell-3;
    }
    .cell-4 {
      grid-area: cell-4;
    }
    .cell-5 {
      grid-area: cell-5;
    }
    .cell-6{
      grid-area: cell-6;
    }
    .cell-7{
      grid-area: cell-7;
    }
    height: 90%;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    grid-template-areas: 
      "cell-1 cell-2"
      "cell-3 cell-4"
      "cell-5 cell-5"
      "cell-6 cell-6";
  }
</style>
