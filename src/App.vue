

<template>
  <header class="header-component">
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
  .header-component{
    max-width: 600px;
    width: 100%;
    margin-bottom: 4rem;
  }
  section{
    max-width: 600px;
    width: 100%;
    margin-bottom: 4rem;
  }

  @media screen and (max-width: 768px) {
    .header-component {
      margin-bottom: 2rem;
    }

    section{
    margin-bottom: 2rem;
  }
  }
</style>