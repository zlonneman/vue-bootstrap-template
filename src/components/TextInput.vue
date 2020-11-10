<template>
   <div class="text-input">
      <label><b>{{label}}</b></label>
      <div class="input-group">
        <input 
          :type="type"
          class="form-control" 
          :disabled="disabled"
          :placeholder="placeholder"  
          :style="customStyles"
          :value="value"
          @input="change"
          :aria-label="label">
      </div>
   </div>
</template>

<script>
   export default {
     name: "TextInput",
     props: {
        label: {
           type: String,
        },
        placeholder: {
           type: String,
        },
        focus: {
           type: Boolean,
           default: false,
        },
        disabled: {
           type: Boolean,
           default: false,
        },
        value: {
           type: String,
        },
        type: {
           type: String,
           default: 'text'
        },
        customStyles: {
            type: Object,
        },
     },
     methods: {
        change($event){
            this.$emit('input',$event.target.value)
            this.$emit('change')
           
        }
     },
   }
</script>

<style lang="scss" scoped>
</style>
