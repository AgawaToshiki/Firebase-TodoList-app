<template>
    <div>
        <form @submit.prevent="signin">
            <div>
                <label for="mail">Email：</label>
                <input type="mailAddress" id="mail" v-model="mailAddress" required/>
            </div>
            <div>
                <label for="password">Password：</label>
                <input type="password" id="password" v-model="password" required/>
            </div>
            
            <input type="submit" value="ログイン">
            
        </form>
        
        <button @click="signup">新規登録</button>
    </div>
</template>

<script lang="js">
import { auth } from "./firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"










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
            const mailAddress = this.mailAddress
            const password = this.password
            signInWithEmailAndPassword(auth, mailAddress, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('サインインできません('+ errorCode + errorMessage +')')
            });
        },
    }
}



    // register.addEventListener('click', function(e) {
    //     const mailAddress = document.getElementById('mailAddress').value;
    //     const password = document.getElementById('password').value;
        
    //     firebase.auth().createUserWithEmailAndPassword(mailAddress, password)
    //     .catch(function(error) {
    //         alert('登録できません（' + error.message + '）');
    //     });
    // });
</script>