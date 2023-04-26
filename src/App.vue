

<template>
  <header>
    <Header :isSignedIn="this.isSignedIn" />
  </header>
  <section v-if="!isSignedIn">
    <Login />
  </section>
  <section v-else>
    <TodoDashBoard />
  </section>
</template>

<script lang="js">
import Header from './components/Header.vue'
import Login from './components/Login.vue'
import TodoDashBoard from './components/TodoDashBoard.vue'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from './components/firebase'

  export default{
    data(){
      return {
        isSignedIn: false,
      }
    },
    components:{
      Header,
      Login,
      TodoDashBoard,
    },
    created() {
      onAuthStateChanged(auth, (user) => {
        this.isSignedIn = !!user
      })
    },
  }
</script>

<style>
  section{
    width:600px;
  }
</style>