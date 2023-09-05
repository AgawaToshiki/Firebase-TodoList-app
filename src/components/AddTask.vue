<template>
    <div class="new-task">
        <form action="">
            <div class="newtask-name">
                <label for="add-task">Task:</label>
                <input type="text" v-model="newTask" id="add-task">
            </div>
            <div class="newtask-deadline">
                <label for="add-deadline">Deadline:</label>
                <input type="datetime-local" v-model="newDeadline" id="add-deadline">
            </div>
            <div>
                <label for="add-image">Image:</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    id="add-image"
                    ref="image"
                    :value="imageValue"
                    @change="PreviewImage"
                >
                <img :src="imageUrl" alt="アップロードする画像" v-if="imageUrl">
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
import { auth, db, storage } from "./firebase"
import { collection, addDoc, } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"
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
                imageUrl: '',
                file: '',
                filePath: '',
                imageValue: '',
            }
        },
        methods: {
            addData: async function(){
                if(this.newTask && this.newDeadline){
                    const newTask = this.newTask
                    const newDeadline = new Date(this.newDeadline)
                    const currentTime = new Date
                    const uid = auth.currentUser.uid
                    // const filePath = `TaskImage/${uid}/${this.file.name}`
                    if(this.file){
                        const storageRef = ref(storage, this.filePath)
                        await uploadBytes(storageRef, this.file).then((snapshot) => {
                            //処理が成功したら初期値へリセット
                            this.imageUrl = ""
                            this.file = ""
                            this.imageValue = ""
                        },(error) => {
                            alert(`${error}：画像を正常に登録できませんでした。`)
                            return
                        });
                    }

                    await addDoc(collection(db, "tasks"), {
                        contents: newTask,
                        deadline: newDeadline,
                        status: 'ON_GOING',
                        userID: uid,
                        addTime: currentTime,
                        imageFilePath: this.filePath,
                    })

                    this.newTask = ""
                    this.newDeadline = ""
                    this.filePath = ""
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
                    this.imageUrl = imageUrl
                    this.file = file
                    this.filePath = `TaskImage/${uid}/${timestamp}${file.name}`
                    this.imageValue = event.target.value
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