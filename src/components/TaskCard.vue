<template>
    <div v-if="task.status === 'ON_GOING'">
        <ViewTask :task="task" v-if="!isEditTask" @isEdit="isEdit"/>
        <EditTask :task="task" v-else @isEdit="isEdit"/>     
    </div>
    <div class="task" v-else-if="task.status === 'FINISHED'">
        <ViewTask :task="task"/>
    </div>
</template>

<script lang="js">
    import { auth, db, storage } from "./firebase"
    import { ref, deleteObject } from "firebase/storage"
    import { doc, updateDoc, deleteDoc } from "firebase/firestore"
    import { format } from 'date-fns'
    import AppButton from './AppButton.vue'
    import ViewTask from './ViewTask.vue'
    import EditTask from './EditTask.vue'


    export default{
        name: 'TaskCard',
        components: {
            AppButton,
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

<style scoped>
    .task,.edit-task{
        display:flex;
    }

    .flex-box{
        width:50%;
        padding:20px;
    }
    .side-button{
        width:50%;
        text-align:center;
        align-self:center;
    }
    .button-box{
        display:flex;
        align-items:center;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    .edit-button{
        margin: 0 10px 0 0;
    }
    .inputwidth{
        width:100%;
    }
    .task-image{
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

</style>