<template>
  <div class="sk-three-bounce" v-bind:style="baseStyle">
    <div class="sk-child sk-bounce1" v-bind:style="dotStyle"></div>
    <div class="sk-child sk-bounce2" v-bind:style="dotStyle"></div>
    <div class="sk-child sk-bounce3" v-bind:style="dotStyle"></div>
  </div>
</template>

<script>
export default {
  props: [
    'size',
    'color'
  ],

  computed: {
    cSize() {
      return typeof this.size === "undefined" ? 20 : this.size
    },

    cColor() {
      return typeof this.color === "undefined" ? "#666" : this.color
    }
  },

  created() {
    this.baseStyle = {
      "line-height": this.cSize + "px"
    }

    let dotSize = this.cSize * 0.4 + "px"
    this.dotStyle = {
      "background-color": this.cColor,
      width: dotSize,
      height: dotSize
    }
  }
}
</script>

<style lang="scss" scoped>
  .sk-three-bounce {
    text-align: center;
  }
  
  .sk-child {
    animation-name: sk-three-bounce;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    animation-duration: 1.4s;
    border-radius: 100%;
    display: inline-block;
  }
  
  .sk-bounce1 {
    animation-delay: -0.32s;
  }
  
  .sk-bounce2 {
    animation-delay: -0.16s;
  }
  
  @keyframes sk-three-bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1.0);
    }
  }
</style>