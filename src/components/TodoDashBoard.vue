<template>
    <div id="task-page">
        <h2>AddTask</h2>
        <AddTask />
        <div>
            <h2>Tasks</h2>
            <div class="task-list">
                <TaskList :tasks="ON_GOING" v-if="ON_GOING.length>0"/>
                    <div v-else>
                        <p class="noTasks">NO Tasks</p>
                    </div>
            </div>
        </div>
        <div>
            <h2>Finished</h2>
            <div class="task-list" >
                <TaskList :tasks="FINISHED"  v-if="FINISHED.length>0"/>
                <div v-else>
                    <p class="noTasks">NO Tasks</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
    import { auth, db, storage } from "./firebase"
    import { collection, query, where, onSnapshot } from "firebase/firestore"
    import { ref,getDownloadURL } from "firebase/storage"
    import AddTask from "./AddTask.vue"
    import AppButton from "./AppButton.vue"
    import TaskList from "./TaskList.vue"
    import util from "./util"



    
    export default{
        name: 'TodoDashBoard',
        components: {
            AddTask,
            AppButton,
            TaskList,
        },
        data(){
            return{
                tasks: [],
            }
        },
        created: function(){
            try{
                const currentUser = auth.currentUser.uid
                if(!currentUser){
                    throw new util.AuthError()
                }
                this.watchObserver(currentUser)
            }catch(error){
                const errorResult = util.errorHandler(error)
                console.error(errorResult.message)
                alert(errorResult.message + '：認証に失敗しました')
            }
        },
        computed: {
            ON_GOING: function(){
                return this.tasks.filter((t) => t.status === "ON_GOING")
            },

            FINISHED: function(){
                return this.tasks.filter((t) => t.status === "FINISHED")
            },
        },
        methods: {
            watchObserver: function(currentUser){
                const watch = query(collection(db, "tasks"), where("userID", "==", currentUser))
                onSnapshot(watch,(querySnapshot) => {
                    this.tasks = []
                    querySnapshot.forEach(async(doc) => {
                        const id = doc.id
                        const data = doc.data()
                        let imageUrl = ""
                        if(data.imageFilePath){
                            imageUrl = await getDownloadURL(ref(storage, data.imageFilePath))
                        }
                        this.tasks.push({
                            id,
                            ...data,
                            imageUrl,
                            deadline: data.deadline.toDate(),
                            addTime: data.addTime.toDate().getTime(),
                        })
                    })
                })
            },

        },
    }
</script>

<style scoped>
    body{
        margin:0;
    }

    *,*::before,*::after{
        box-sizing:border-box;
    }

    #task-page{
        max-width:600px;
        width: 100%;
    }

    h2{
        text-align:center;
    }
    .task-list{
        border:1px solid #000;
    }

    .noTasks{
        text-align:center;
    }
</style>