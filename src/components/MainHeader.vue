<template>
  <header class="header">
    <div class="logo" @click="goHome"></div>
    <div class="icon-bookmark2"></div>
  </header>
</template>
<script>
export default {
  name: "main-header",
  methods: {
    goHome() {
      this.$router.push('/searchBus');
    }
  }
};
</script>
<style lang="scss" scope>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  .logo {
      margin-left: 5%;
      cursor: pointer;
  }
  .icon-bookmark2 {
      margin-right: 5%;
  }
}
</style>