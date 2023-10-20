<template>
    <div>
        <div>
            <label for="mail">Email:</label>
            <input type="e-mail" id="mail" v-model="mailAddress" required/>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required/>
        </div>
        <button @click="signin">SignIn</button>
        <button @click="signup">SignOut</button>
    </div>
</template>

<script lang="js">
import { auth } from "./firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import util from "./util"










export default {
    name: 'Login',
    data(){
        return{
            mailAddress: '',
            password: '',
        }
    },
    methods:{
        
        signup: function(){
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
                alert('登録できません（' + error.message + '）');
            });
        },

        signin: function(){
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