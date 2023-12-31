<template>
    <div class="login">
        <div class="login-form">
            <label for="mail">Email:</label>
            <input type="e-mail" id="mail" v-model="mailAddress" required/>
        </div>
        <div class="login-form">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required/>
        </div>
        <div class="login-button">
            <AppButton 
                @click="signIn"
                btnSize="midium"
                btnColor="green">
                SignIn
            </AppButton>
            <AppButton 
                @click="signUp"
                btnSize="midium">
                SignUp
            </AppButton>
        </div>
    </div>
</template>

<script lang="js">
import { auth } from "./firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import util from "./util"
import AppButton from './AppButton.vue'


export default {
    name: 'Login',
    components: {
        AppButton,
    },
    data(){
        return{
            mailAddress: '',
            password: '',
        }
    },
    methods:{
        
        signUp: function(){
            if(!this.mailAddress || !this.password){
                alert('新規登録するにはE-mailとPasswordを入力してください')
                return
            }
            const mailAddress = this.mailAddress
            const password = this.password
            createUserWithEmailAndPassword(auth, mailAddress, password)
            .then(()=>{
                console.log('成功しました。')
            })
            .catch(function(error) {
                const loginError = util.LoginErrorHandler(error)
                alert(loginError.message)
            });
        },

        signIn: function(){
            if(!this.mailAddress || !this.password){
                alert('サインインするにはE-mailとPasswordを入力してください')
                return
            }
            const mailAddress = this.mailAddress
            const password = this.password
            signInWithEmailAndPassword(auth, mailAddress, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const loginError = util.LoginErrorHandler(error)
                alert(loginError.message)
            });
        },
    }
}
</script>

<style scoped>
.login {
    margin-top: 30px;
}
.login-form {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}
.login-form input {
    width: 75%;
}

.login-form label {
    width: 25%;
}
.login-button {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 30px;
}
</style>