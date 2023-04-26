<template>
    <div id="task-page">
        <h2>AddTask</h2>
        <AddTask />
        <div>
            <h2>Tasks</h2>
            <div class="task-list">
                <TaskList :tasks="ON_GOING"/>
            </div>
        </div>
        <div>
            <h2>Finished</h2>
            <div class="task-list" >
                <TaskList :tasks="FINISHED"  v-if="FINISHED.length>0"/>
                <div v-else>
                nai</div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
    import { auth, db } from "./firebase"
    import { collection, query, where, onSnapshot } from "firebase/firestore"
    import AddTask from "./AddTask.vue"
    import AppButton from "./AppButton.vue"
    import TaskList from "./TaskList.vue"







    
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
            const currentUser = auth.currentUser.uid
            this.watchObserver(currentUser)
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
                onSnapshot(watch, (querySnapshot) => {
                    this.tasks = []
                    querySnapshot.forEach((doc) => {
                        const id = doc.id
                        const data = doc.data()
                        this.tasks.push({
                            id,
                            ...data,
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
        width:600px;
    }

    h2{
        text-align:center;
    }
    .task-list{
        border:1px solid #000;
    }
</style>