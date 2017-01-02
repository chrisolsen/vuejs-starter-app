<template>
  <button class="facebook" type="button" v-on:click="click">Login Via Facebook</button>
</template>

<script>
export default {
  methods: {
    click() {
      this.$emit("click")
    }
  }
}
</script>

<style lang="scss" scoped>
  .facebook {
    background-color: #3b5998;
    background-image: url("../../assets/fb.svg");
    background-position: 0 50%;
    background-repeat: no-repeat;
    padding-left: 30px;
    background-size: contain;
  }
</style>