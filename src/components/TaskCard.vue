<template>
    <div v-if="task.status === 'ON_GOING'">
        <ViewTask :task="task" v-if="!isEditTask" @isEdit="isEdit"/>
        <EditTask :task="task" v-else @isEdit="isEdit"/>     
    </div>
    <div v-else-if="task.status === 'FINISHED'">
        <ViewTask :task="task"/>
    </div>
</template>

<script lang="js">
    import { format } from 'date-fns'
    import ViewTask from './ViewTask.vue'
    import EditTask from './EditTask.vue'


    export default{
        name: 'TaskCard',
        components: {
            ViewTask,
            EditTask,
        },
        props: {
            task: {
                type: Object,
                required: true
            },
        },
        data(){
            return{
                localTask: '',
                isEditTask: false,
            }
        },
        computed: {

            formatDeadline(){ 
                return format(this.task.deadline, 'yyyy年MM月dd日H時mm分')
            },
        },
        methods: {
            isEdit: function(){
                this.isEditTask = !this.isEditTask
            }
        },
    }
</script>