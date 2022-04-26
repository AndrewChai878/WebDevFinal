<template>
  <div class="home">
    <AppHome/>
    <QuoteLine/>
  </div>
</template>

<script>
// @ is an alias to /src
import AppHome from '@/components/Home.vue'
import QuoteLine from '@/components/QuoteLine.vue'

export default {
  name: 'HomeView',
  components: {
    AppHome,
    QuoteLine
  }
}
</script>
