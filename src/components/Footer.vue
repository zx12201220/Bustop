<template>
  <footer class="footer">Bustop© - All Rights Reserved.</footer>
</template>
<script>
export default {
  name: "v-footer",
};
</script>
<style lang="scss">
$gray: #f9f9f9;
.footer {
  height: 44px;
  line-height: 44px;
  background-color: $gray;
  text-align: center;
}
@media screen and (max-width: 769px){
  .footer {
    display: none;
  }
}
</style>