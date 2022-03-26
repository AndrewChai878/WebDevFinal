<template>
  <div class="home">
    <AppHome/>
  </div>
</template>

<script>
// @ is an alias to /src
import AppHome from '@/components/Home.vue'

export default {
  name: 'HomeView',
  components: {
    AppHome
  }
}
</script>
