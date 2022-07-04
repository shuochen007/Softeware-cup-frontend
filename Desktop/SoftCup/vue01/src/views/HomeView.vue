<template>
  <div class="home">
    <Rain></Rain>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Rain from '@/components/Rain.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Rain,
  }
}
</script>
