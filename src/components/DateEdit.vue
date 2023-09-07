<template>
    <input v-model="dateTime" type="datetime-local">
</template>

<script>
  import { parse, format, isValid } from 'date-fns'

  export default{
    name: 'DateEdit',
    props: {
      modelValue: {
        type: Date,
        default: null,
      }
    },
    emits: ['update: modelValue'],
    computed: {

      dateTime: {
        get: function(){
          if(!this.modelValue){ return '' } 
          return format(this.modelValue, 'yyyy-MM-dd\'T\'HH:mm')
        },
        set: function(value){
          if(!value){
            this.$emit('update:modelValue', null)
            return
          }
          const date = parse(value, 'yyyy-MM-dd\'T\'HH:mm', new Date())
          this.$emit('update:modelValue', isValid(date) ? date : null)
        },
      }
    },
  }
</script>