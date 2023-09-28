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
                    @change="previewImage"
                >
                <TaskImage :imageUrl="imageInfo.localImageUrl" v-if="imageInfo.localImageUrl" @deleteImage="deleteImage" class="new-task task-image"/>
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
import { storage } from "./firebase"
import { ref, uploadBytes, deleteObject } from "firebase/storage"


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
                    imageValue: '',
                    localImageUrl: '',
                },
            }
        },
        methods: {
            addData: async function(){
                //タスクか期限が空であればreturn
                if(!this.newTask || !this.newDeadline){
                    alert("タスク・期限を入力してください。")
                    return
                }
                const newTask = this.newTask
                const newDeadline = new Date(this.newDeadline)
                const currentTime = new Date
                const uid = auth.currentUser.uid
                //画像アップロード処理
                if(this.imageInfo.file){
                    const storageRef = ref(storage, this.imageInfo.filePath)
                    try{
                        await uploadBytes(storageRef, this.imageInfo.file)
                    }catch(error){
                        console.error(error.message)
                        alert('画像を正常に登録できませんでした')
                    }
                }
                try{
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
                    for(const key in this.imageInfo){
                            this.imageInfo[key] = ""
                        }
                }catch(error){
                    console.error(error.message)
                    alert('Taskを追加できませんでした')
                    //失敗した場合は登録時の画像を削除
                    await deleteObject(ref(storage, this.localTask.imageFilePath))
                }
            },
            previewImage: function(event){
                const file = event.target.files[0]
                const uid = auth.currentUser.uid
                const timestamp = Date.now()
                if(file){
                    const localImageUrl = URL.createObjectURL(file)
                    this.imageInfo.localImageUrl = localImageUrl
                    this.imageInfo.file = file
                    this.imageInfo.filePath = `TaskImage/${uid}/${timestamp}${file.name}`
                    this.imageInfo.imageValue = event.target.value
                }
            },
            deleteImage: function(){
                for(const key in this.imageInfo){
                    this.imageInfo[key] = ""
                }
            }
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