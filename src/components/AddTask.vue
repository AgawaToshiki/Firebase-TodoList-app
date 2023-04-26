<template>
    <div class="new-task">
        <form action="">
            <div class="newtask-name">
                <label for="">Task:</label>
                <input type="text" v-model="newTask">
            </div>
            <div class="newtask-deadline">
                <label for="">Deadline:</label>
                <input type="datetime-local" v-model="newDeadline">
            </div>
        </form>
        <AppButton 
            class="add-button"
            @click="addData"
            btnSize="midium">
            Add
        </AppButton>
    </div>
</template>


<script>
import { auth, db } from "./firebase"
import { collection, addDoc, } from "firebase/firestore"

import AppButton from './AppButton.vue'


    export default{
        name: 'AddTask',
        components: {
            AppButton
        },
        data(){
            return {
                newTask: '',
                newDeadline: '',
            }
        },
        methods: {
            addData: async function(){
                if(this.newTask && this.newDeadline){
                    const newTask = this.newTask
                    const newDeadline = new Date(this.newDeadline)
                    const currentTime = new Date
                    const uid = auth.currentUser.uid
                    await addDoc(collection(db, "tasks"), {
                        contents: newTask,
                        deadline: newDeadline,
                        status: 'ON_GOING',
                        userID: uid,
                        addTime: currentTime,
                    });
                    this.newTask = ""
                    this.newDeadline = ""
                }else{
                    alert('タスク・期限を入力してください。')
                }
            },
        }
    }
</script>


<style scoped>

    .new-task{
        display:flex;
        flex-direction:column;
    }
    .newtask-name{
        display:flex;
        justify-content:space-between;
        margin-bottom:30px;
    }
    .newtask-deadline{
        display:flex;
        justify-content:space-between;
        margin-bottom:30px;
    }
    .newtask-name input,.newtask-deadline input{
        width:500px;
    }
    .add-button{
        margin:0 0 0 auto;
    }
    
</style>