<template>
    <div id="header">
        <h1>ToDo List App</h1>
        <div class="signout-button" v-if="isSignedIn">
            <AppButton 
                @click="signOut"
                btnSize="midium"
                btnColor="red">
                SignOut
            </AppButton>
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
            signOut: function(){
                signOut(auth).then(() => {
                // Sign-out successful.
                }).catch((error) => {
                // An error happened.
                    alert('サインアウトが正常にできませんでした（' + error.message + '）')
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
        justify-content:center;
        column-gap:50px;
        background-color:#999
    }
</style>