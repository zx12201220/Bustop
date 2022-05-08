<template>
  <header class="header">
    <div class="icon-back" @click="goBackPage"></div>
    <div class="title">路線規劃</div>
  </header>
</template>
<script>
export default {
  name: "route-header",
  methods: {
    goBackPage() {
      this.$router.go(-1);
    }
  },
};
</script>
<style lang="scss" scope>
.header {
    position: relative;
  width: 100%;
  height: 64px;
  .icon-back {
      position: absolute;
      left: 0%;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
  }
  .title {
      width: 100%;
      line-height: 64px;
      text-align: center;
  }
}
</style>