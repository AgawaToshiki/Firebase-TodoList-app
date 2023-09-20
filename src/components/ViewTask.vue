<template>
    <div class="task">
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
</template>

<script lang="js">
    import { auth, db, storage } from "./firebase"
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
                    alert(`${error}:Taskの削除に失敗しました。`)
                }
                if(this.task.imageFilePath){
                    try{
                        await deleteObject(ref(storage, this.task.imageFilePath))
                    }catch(error){
                        alert(`${error}:画像の削除に失敗しました。`)
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
                    alert(`${error}:ステータスを更新できませんでした。`)
                }
            },
        },
    }
</script>

<style scoped>
    .flex-box{
        width:50%;
        padding:20px;
    }
    .side-button{
        width:50%;
        text-align:center;
        align-self:center;
    }
    .task-image{
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
</style>