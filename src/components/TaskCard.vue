<template>
    <div v-if="task.status === 'ON_GOING'">
        <div class="task" v-if="!isEditTask">
            <div class="flex-box">
                <p>task:{{ task.contents }}</p>
                <p>Deadline:{{ formatDeadline }}</p>
                <div><img :src="task.imageUrl" v-if="task.imageUrl" alt="" class="task-image"></div>                
                <div>
                    <AppButton
                        @click="editData()"
                        btnColor="green"
                        btnSize="small">
                        Edit
                    </AppButton>
                    <AppButton
                        @click="deleteData(task.id)"
                        btnColor="red"
                        btnSize="small">
                        Delete
                    </AppButton>
                </div>
            </div>
            <div class="side-button">
                <AppButton
                    @click="completeTask(task.id)"
                    btnColor="blue"
                    btnSize="large">
                    Done
                </AppButton>
            </div>
        </div>
        <div class="edit-task" v-else>
            <div class="flex-box">
                <input type="text" class="inputwidth" v-model="localTask.contents">
                <DateEdit class="inputwidth" v-model="localTask.deadline" />
            </div>
            <div class="side-button">
                <AppButton
                        @click="updateData(task.id)"
                        btnColor="green"
                        btnSize="midium">
                        Update
                </AppButton>
                <AppButton
                        @click="cancelEdit()"
                        btnColor="red"
                        btnSize="midium">
                        Cancel
                </AppButton>
            </div>

        </div>
    </div>
    <div class="task" v-else-if="task.status === 'FINISHED'">
        <div class="flex-box">
            <p>task:{{ task.contents }}</p>
            <p>Deadline:{{ formatDeadline }}</p>
            <div><img :src="task.imageUrl" v-if="task.imageUrl" alt="" class="task-image"></div>
        </div>
        <div class="side-button">
            <AppButton
                @click="returnTask(task.id)"
                btnColor="green"
                btnSize="midium">
                Return
            </AppButton>
            <AppButton
                @click="deleteData(task.id)"
                btnColor="red"
                btnSize="midium">
                Delete
            </AppButton>
        </div>
    </div>
</template>

<script lang="js">
    import { db, storage } from "./firebase"
    import { ref, deleteObject } from "firebase/storage"
    import { doc, updateDoc, deleteDoc } from "firebase/firestore"
    import { format } from 'date-fns'
    import AppButton from './AppButton.vue'
    import DateEdit from './DateEdit.vue'


    export default{
        name: 'TaskCard',
        components: {
            AppButton,
            DateEdit,
        },
        props: {
            task: {
                type: Object,
                required: true
            },
        },
        data(){
            return{
                localTask: Object.assign({}, this.task),
                isEditTask: false,
            }
        },
        computed: {

            formatDeadline(){ 
                return format(this.task.deadline, 'yyyy年MM月dd日H時mm分')
            },
        },
        methods: {

            editData: function(){
                this.isEditTask = true
            },

            deleteData: async function(id){
                await deleteDoc(doc(db, "tasks", id))
                if(this.task.imageFilePath){
                    await deleteObject(ref(storage, this.task.imageFilePath))
                }
            },

            updateData: async function(id){
                const updateTask = doc(db, "tasks", id)
                await updateDoc(updateTask, {
                    contents: this.localTask.contents,
                    deadline: this.localTask.deadline
                })
                this.isEditTask = false
            },

            cancelEdit: function(){
                //キャンセル時に元データと入力の値に違いがあれば値を元データに戻す
                if(this.task.deadline !== this.localTask.deadline){
                    this.localTask.deadline = this.task.deadline
                }
                this.isEditTask = false
            },

            returnTask: async function(id){
                const updateTask = doc(db, "tasks", id)
                await updateDoc(updateTask, {
                    status: "ON_GOING",
                })
            },

            completeTask: async function(id){
                const updateTask = doc(db, "tasks", id)
                await updateDoc(updateTask, {
                    status: "FINISHED",
                })
            },
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