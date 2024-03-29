<template>
    <div class="task">
        <div class="flex-box">
            <div class="task-item">
                <p>Task:</p>
                <p>{{ task.contents }}</p>
            </div>
            <div class="task-item">
                <p>Deadline:</p>
                <p>{{ formatDeadline }}</p>
            </div>
            <div><img :src="task.imageUrl" v-if="task.imageUrl" alt="" class="task-image"></div>                
            <div v-if="task.status === 'ON_GOING'" class="task-button-box">
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
        <div class="side-button complete-button" v-if="task.status === 'ON_GOING'">
            <AppButton
                @click="completeTask(task.id)"
                btnColor="blue"
                btnSize="large">
                Done
            </AppButton>
        </div>
        <div class="side-button finished-button"  v-else-if="task.status === 'FINISHED'">
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


    export default{
        name: 'ViewTask',
        components: {
            AppButton,
        },
        props: {
            task: {
                type: Object,
                required: true
            },
        },
        emits: ["isEdit"],
        
        computed: {

            formatDeadline(){ 
                return format(this.task.deadline, 'yyyy年MM月dd日H時mm分')
            },
        },
        methods: {

            editData: function(){
                this.$emit('isEdit')
            },

            deleteData: async function(id){
                try{
                    await deleteDoc(doc(db, "tasks", id))
                }catch{
                    console.error(error.message)
                    alert('Taskの削除に失敗しました')
                }
                if(this.task.imageFilePath){
                    try{
                        await deleteObject(ref(storage, this.task.imageFilePath))
                    }catch(error){
                        console.error(error.message)
                        alert('画像の削除に失敗しました')
                    }
                }
            },

            completeTask: async function(id){
                const updateTask = doc(db, "tasks", id)
                try{
                    await updateDoc(updateTask, {
                        status: "FINISHED",
                    })
                }catch(error){
                    console.error(error.message)
                    alert('ステータスを更新できませんでした')
                }
            },

            returnTask: async function(id){
                const updateTask = doc(db, "tasks", id)
                try{
                    await updateDoc(updateTask, {
                        status: "ON_GOING",
                    })
                }catch(error){
                    console.error(error.message)
                    alert('ステータスを更新できませんでした')
                }
            },
        },
    }
</script>

<style scoped>
    .task{
        display:flex;
        padding: 35px;
    }
    .flex-box{
        width:50%;
        box-sizing: border-box;
    }

    .task-button-box {
        display: flex;
        column-gap: 10px;
        margin: 1rem 0;
    }
    .side-button{
        display:flex;
        justify-content:center;
        column-gap:10px;
        width:50%;
        text-align:center;
        align-self:center;
    }

    .task-item {
        display: flex;
    }
    .task-image{
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    @media screen and (max-width: 768px) {
        .task {
            flex-direction: column;
        }
        .task-item {
            flex-direction: column;
            margin-bottom: 1rem;
        }

        .task-item p {
            margin: 0;
        }

        .flex-box{
            width:100%;
            margin-bottom: 1rem;
        }
        .side-button{
            width:100%;
        }

        .side-button.complete-button button{
            width:100%;
        }

        .side-button.finished-button {
            width: 100%;
            column-gap: 30px;
        }

    }
</style>