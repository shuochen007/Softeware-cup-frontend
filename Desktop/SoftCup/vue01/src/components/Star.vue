<template>
  <div :style="style">
    <vue-particles
        color="#ffffff"
        :particleOpacity="0.7"
        :particlesNumber="number"
        shapeType="circle"
        :particleSize="3"
        linesColor="#E6E6FA"
        :linesWidth="1"
        :lineLinked="linked"
        :lineOpacity="0.6"
        :linesDistance="150"
        :moveSpeed="speed"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        :clickMode="mode"
    >
    </vue-particles>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AnimatedWallpaper",
  props: {
    bgImg: {
      type: String,
      default: require('@/assets/one.jpg')
    },
    number: {
      type: Number,
      default: 50 // 100
    },
    linked: {
      type: Boolean,
      default: true // false
    },
    speed: {
      type: Number,
      default: 6 // 8
    },
    mode: {
      type: String,
      default: "push" // "repulse"
    }
  },
  data() {
    return {
      style: {
        background: 'url(' + this.bgImg + ') no-repeat top',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        height: '100%',
        width: '100%',
        position: 'fixed',
        overflow: 'scroll',
        zIndex: -99999
      }
    }
  }
}
</script>

<style scoped>
#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  z-index: -99998;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  display: none;
}
</style>