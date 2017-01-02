<template>
  <div class="message" v-if="message" v-bind:class="type">
    <div class="content">{{message}}</div>
    <div class="close" v-on:click="close">Close</div>
  </div>
</template>

<script>
export default {
  props: [
    "type",   // success || error || warning || info
    "message",
    "duration"
  ],
  created() {
    if (this.duration > 0) {
      setTimeout(() => {
        this.close()
      }, this.duration)
    }
  },
  methods: {
    close() {
      this.$store.commit("message", null)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../scss/colors";
  .message {
    display: flex;
    padding: 1rem;
    margin: 1rem;
  }
  
  .content {
    flex: 1 1 auto;
  }
  
  .close {
    flex: 0 0 auto;
  }
  
  .success {
    background: $successBGColor;
    color: $successTextColor;
  }
  
  .error {
    background: $errorBGColor;
    color: $errorTextColor;
  }
  
  .warning {
    background: $warningBGColor;
    color: $warningTextColor;
  }
</style>