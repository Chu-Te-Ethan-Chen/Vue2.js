<template>
  <div id="dashboard">
    <h1>Dashboard</h1>
    <hr>
    <!-- <p>You should only get here if you're authenticated!</p> -->
    <p v-if="email">Welcome {{ email }}</p>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        email: '',
      }
    },
    // computed:{
    //   email () {
    //     return !this.$store.getters.user ? false : this.$store.getters.user.email
    //   }
    // },
    created () {
      this.$store.dispatch('fetchUser')
      this.email = this.$store.getters.user.email
      // console.log('from dashboard', this.$store.getters.user)
    }
  }
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    /* color: red; */
    font-weight: bold;
    font-size: 3 rem;
  }
</style>