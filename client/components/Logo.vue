<template>
  <div class="logo">
    <img src="~/assets/images/logo.png" alt="Bossnet logo" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.lg {
  img {
    width: 250px;
  }
}
.sm {
  @screen sm {
    img {
      width: 120px;
    }
  }
  img {
    width: 100px;
  }
}
</style>