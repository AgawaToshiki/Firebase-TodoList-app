<template>
    <div class="edit-task">
        <div class="flex-box">
            <input type="text" class="inputwidth" v-model="localTask.contents">
            <DateEdit class="inputwidth" v-model="localTask.deadline" />
            <div>
                <TaskImage :imageUrl="localTask.imageUrl" v-if="localTask.imageFilePath" @deleteImage="deleteImage" />
                <input 
                    type="file"
                    accept="image/*" 
                    id="add-image"
                    :value="imageValue"
                    @change="previewImage"
                >
            </div>
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
</template>

<script lang="js">
    import { auth, db, storage } from "./firebase"
    import { ref, uploadBytes, deleteObject } from "firebase/storage"
    import { doc, updateDoc } from "firebase/firestore"
    import AppButton from './AppButton.vue'
    import DateEdit from './DateEdit.vue'
    import TaskImage from './TaskImage.vue'


    export default{
        name: 'EditTask',
        components: {
            AppButton,
            DateEdit,
            TaskImage,
        },
        props: {
            task: {
                type: Object,
                required: true
            },
        },
        emits: ["isEdit"],
        data(){
            return{
                localTask: Object.assign({},this.task),
                file: '',
                imageValue: '',
            }
        },
        methods: {
            updateData: async function(id){
                //画像アップロード処理

                //画像が追加・変更・削除された時
                if(this.task.imageFilePath !== this.localTask.imageFilePath){
                    //画像がある時だけ登録
                    if(this.localTask.imageFilePath){
                        const storageRef = ref(storage, this.localTask.imageFilePath)
                        await uploadBytes(storageRef, this.file)
                    }
                    //前の画像がある場合は削除
                    if(this.task.imageFilePath){
                        await deleteObject(ref(storage, this.task.imageFilePath))
                    }
                }
                //Firestoreへ書き込み
                if(this.localTask){
                    const updateTask = doc(db, "tasks", id)
                    //画像のパスがある時は一緒に登録
                    if(this.localTask.imageFilePath){
                        await updateDoc(updateTask, {
                            contents: this.localTask.contents,
                            deadline: this.localTask.deadline,
                            imageFilePath: this.localTask.imageFilePath
                        })
                    }else{
                        //画像がないまたは消した時はパスを削除して登録
                        await updateDoc(updateTask, {
                            contents: this.localTask.contents,
                            deadline: this.localTask.deadline,
                            imageFilePath: '',
                        })
                    }
                }
                this.file = ''
                this.imageValue = ''
                //updateが成功した時のみemitで発火
                this.$emit('isEdit')

            },

            cancelEdit: function(){
                this.localTask = this.task
                this.file = '',
                this.imageValue = '',
                this.$emit('isEdit')
            },

            previewImage: function(event){
                const file = event.target.files[0]
                const uid = auth.currentUser.uid
                const timestamp = Date.now()
                if(file){
                    //更新予定の画像を仮タスクへ代入
                    this.localTask.imageUrl = URL.createObjectURL(file)
                    this.localTask.imageFilePath = `TaskImage/${uid}/${timestamp}${file.name}`
                    this.file = file
                    this.imageValue = event.target.value
                }
            },
            
            deleteImage: function(){
                this.localTask.imageUrl = ""
                this.localTask.imageFilePath = ""
                this.file = ""
                this.imageValue = ""
            }
        },
    }
</script>

<style scoped>
    .edit-task{
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
    .inputwidth{
        width:100%;
    }
</style>