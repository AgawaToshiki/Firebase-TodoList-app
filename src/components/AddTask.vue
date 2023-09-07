<template>
    <div class="add-task">
        <form action="">
            <div class="new-task task-name">
                <label for="add-task">Task:</label>
                <input type="text" v-model="newTask" id="add-task">
            </div>
            <div class="new-task task-deadline">
                <label for="add-deadline">Deadline:</label>
                <input type="datetime-local" v-model="newDeadline" id="add-deadline">
            </div>
            <div>
                <label for="add-image">Image:</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    id="add-image"
                    :value="imageInfo.imageValue"
                    @change="PreviewImage"
                >
                <TaskImage :imageUrl="imageInfo.localImageUrl" v-if="imageInfo.localImageUrl" class="new-task task-image"/>
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
import TaskImage from './TaskImage.vue'
import { uploadImage } from './util'


    export default{
        name: 'AddTask',
        components: {
            AppButton,
            TaskImage,
        },
        data(){
            return {
                newTask: '',
                newDeadline: '',
                imageInfo: {
                    file: '',
                    filePath: '',
                    localImageUrl: '',
                    imageValue: '',
                },
            }
        },
        methods: {
            addData: async function(){
                if(this.newTask && this.newDeadline){
                    const newTask = this.newTask
                    const newDeadline = new Date(this.newDeadline)
                    const currentTime = new Date
                    const uid = auth.currentUser.uid
                    await uploadImage(this.imageInfo)
                    await addDoc(collection(db, "tasks"), {
                        contents: newTask,
                        deadline: newDeadline,
                        status: 'ON_GOING',
                        userID: uid,
                        addTime: currentTime,
                        imageFilePath: this.imageInfo.filePath,
                    })

                    this.newTask = ""
                    this.newDeadline = ""
                    this.imageInfo.filePath = ""
                }else{
                    alert('タスク・期限を入力してください。')
                }
            },
            PreviewImage: function(event){
                const file = event.target.files[0]
                const uid = auth.currentUser.uid
                const timestamp = Date.now()
                if(file){
                    const imageUrl = URL.createObjectURL(file)
                    this.imageInfo.file = file,
                    this.imageInfo.filePath = `TaskImage/${uid}/${timestamp}${file.name}`,
                    this.imageInfo.localImageUrl = imageUrl,
                    this.imageInfo.imageValue = event.target.value
                }
            },
        }
    }
</script>


<style scoped>

    .add-task{
        display:flex;
        flex-direction:column;
    }
    .new-task{
        display:flex;
        justify-content:space-between;
        margin-bottom:30px;
    }

    .task-name input,
    .task-deadline input{
        width:500px;
    }
    .task-image{
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
    .add-button{
        margin:0 0 0 auto;
    }
    
</style>