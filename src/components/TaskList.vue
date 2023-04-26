<template>
    <select v-model="Order">
        <option value="OrderByAddTime">AddTime</option>
        <option value="OrderByDeadline">Deadline</option>
    </select>
    
    <div v-for="task in OrderByTasks" :key="task.id" class="task-wrapper">
        <TaskCard :task="task" />
    </div>
</template>


<script lang="js">
import TaskCard from './TaskCard.vue'


    export default {
        name: 'TaskList',
        components: {
            TaskCard,
        },
        props: {
            tasks: {
                type: Array,
                required: true,
            },
        },
        data(){
            return{
                Order: 'OrderByAddTime',
            }
        },
        computed: {
            //taskのソート切替
            OrderByTasks(){
                if(this.Order === 'OrderByAddTime')
                //追加日時の新しいものを上から表示
                return this.tasks.sort((a, b) => b.addTime - a.addTime)

                if(this.Order === 'OrderByDeadline')
                //現在時刻に近いものを上から表示
                return this.tasks.sort((a, b) => a.deadline - b.deadline)

                return this.tasks
            },
        },
    }
</script>

<style scoped>
    .task-wrapper{
        border-bottom:1px solid #000;
    }
    .task-wrapper:last-of-type{
        border:none;
    }
</style>