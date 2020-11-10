<template>
    <div class="text-input">
        <div @click="closeWithoutSelecting" v-if="open" class="dropdown-background"></div>
        <label><b>{{label}}</b></label>
        <div class="input-group">
            <input 
              class="form-control border-radius pr-4"
              v-model="displayValue"
              @focus="openOptions"
              @keyup="checkEnterKeyAndClose"
              @keydown="checkTabKeyAndClose"
              ref="dropdown"
              @input="debounce(selectClosestOption, 300)"
              @click="focusDropdown"
              :disabled="disabled"
              :aria-label="{label}"/>
              <i @click="focusDropdown" class="fa fa-angle-down icon-dropdown"  aria-hidden="true"></i>
            <div v-if="open" class="options-card card">
                <ul class="p-0 m-0">
                    <div class="pointer options" v-for="option in computedOptions" :key="option.value" :class="optionSelected(option) ? 'selected' : ''" @click="updateValue(option.value)">{{option.text}}</div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Dropdown",
        props: {
            // [{text: 'display text', value: 'unique value associated with text'}]
            options: {
                type: Array,
            },
            label: {
                type: String,
            },
            value: {
                type: [Number, String],
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            alphabetize: {
                type: Boolean,
                default: true,
            },
        },

        data(){
            return {
                open: false,
                displayValue: null,
            }
        },  
        methods: {
            focusDropdown(){
                this.$refs.dropdown.focus();
            },
            keyCodeIsEnter(code){
                return code === 13;
            },
            keyCodeIsTab(code){
                return code === 9;
            },
            checkEnterKeyAndClose($event){
                if(this.keyCodeIsEnter($event.keyCode)){
                    // this.selectClosestOption();
                    this.closeWithoutSelecting();
                    this.$refs.dropdown.blur();
                }
            },
            checkTabKeyAndClose($event){
                if(this.keyCodeIsTab($event.keyCode)){
                    // this.selectClosestOption();
                    this.closeWithoutSelecting();
                }
            },
            debounce(func, wait) {
                clearTimeout(this.timerId);
                this.timerId = setTimeout(func, wait)
            },
            openOptions(){
                this.displayValue = ''
                this.open = true;
            },
            closeWithoutSelecting(){
                this.getDisplayValue()
                this.closeOptions()
            },
            closeOptions(){
                this.open = false;
            },
            selectClosestOption(){
                console.log('select closest option', this.displayValue)
                let selected = this.options.filter(option => {
                    let op = option.text.slice(0,this.displayValue.length)
                    if(op.toUpperCase() === this.displayValue.toUpperCase()){
                        return option
                    }
                })
                this.displayValue = '';
                if(selected[0]) this.$emit('input',selected[0].value);
            },
            updateValue(selectedOption){
                console.log(selectedOption)
                this.getDisplayValue(selectedOption)
                this.$emit('input',selectedOption);
                this.closeOptions()
            },
            getDisplayValue(option=this.value){
                let index = this.options.map(option => option.value).indexOf(option)
                console.log('get display value', index, this.displayValue, option)
                this.displayValue = index < 0 ? this.displayValue : this.options[index].text
            }, 
            optionSelected(option){
                return option.value === this.value;
            },
        },
        computed: {
            computedOptions(){
                let options = [...this.options]
                if(!this.alphabetize) return options;
                return options.sort(function(a, b) {
                    var textA = a.text.toUpperCase();
                    var textB = b.text.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
            },
        },
        created(){
            this.getDisplayValue()
        }
    }
</script>

<style scoped lang="scss">
.selected{
    color: $primary;
    text-decoration: underline;
}
.border-radius{
    border-radius: 4px !important;
}
.icon-dropdown{
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .options-card{
        z-index: 15;
        // margin-top: 40px;
        position: absolute;
        max-height: 300px;
        overflow: scroll;
        width: -webkit-fill-available;
        
    }
    .options{
        border-bottom: solid .5px grey;
        z-index: 20;
        padding: 5px;
        &:hover {
            background-color: $brand-green-extra-light;
            color: black;
        }
    }
    .dropdown-background{
        position: fixed;
        min-width: 100%;
        min-height: 100%;
        z-index: 10;
        left: 0; 
        top: 0;
        }
    .form-group{
        margin-bottom: 0px;
        select {
            -webkit-appearance: none;
            -moz-appearance: none;
            -o-appearance: none;
            /* no standardized syntax available, no ie-friendly solution available */
        }
        select + i.fa {
            float: right;
            margin-top: -26px;
            margin-right: 5px;
            /* this is so when you click on the chevron, your click actually goes on the dropdown menu */
            pointer-events: none;
            background: inherit;
            /* everything after this is just to cover up the original arrow */
            /* (for browsers that don't support the syntax used above) */
            padding-right: 5px;
        }
    }
</style>