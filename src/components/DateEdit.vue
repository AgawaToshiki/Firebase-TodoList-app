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




<!-- <script setup lang="ts">
  import { parse, format, isValid } from 'date-fns'
  import { computed } from 'vue'

  interface Props {
      modelValue: Date|null
  }
  const props = defineProps<Props>()
  

  const emits = defineEmits(['update:modelValue'])
  
  const formatDate =(arg:Date|null):string=>{
    if (!arg) { return '' }
      return format(arg, 'yyyy-MM-dd\'T\'HH:mm')
  }


  const dateTime = computed({
    get: ():string => {
      return formatDate(props.modelValue)

    },
    set: (value:string):void => {
      if (!value) {
        emits('update:modelValue', null)
        return
      }
      const date = parse(value, 'yyyy-MM-dd\'T\'HH:mm', new Date())
      emits('update:modelValue', isValid(date) ? date : null)
    }
  })
  </script> -->