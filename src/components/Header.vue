<template>
    <div id="header">
        <h1>ToDo List App</h1>
        <div class="signout-button">
            <AppButton 
                v-if="isSignedIn"
                @click="signout"
                btnSize="midium">
                Sign Out
            </AppButton>
            <!-- <button v-if="isSignedIn" @click="signout">Sign out</button> -->
        </div>
        
    </div>
    
</template>

<script>
import { auth } from "./firebase"
import { signOut } from "firebase/auth"
import AppButton from "./AppButton.vue";

    export default{
        name: 'Header',
        components: {
            AppButton
        },
        props: {
            isSignedIn: {
                type: Boolean,
                default: ()=> false
            },
        },
        methods: {
            signout: function(){
                signOut(auth).then(() => {
                    console.log('サインアウトしました')
                // Sign-out successful.
                }).catch((error) => {
                // An error happened.
                });
            },
        }
    }
</script>

<style scoped>
    #header{
        display:flex;
        padding:30px;
        align-items:center;
        justify-content:space-between;
        background-color:#999
    }

    /* h1{
        text-align:center;
    } */
</style>