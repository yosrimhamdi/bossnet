<template>
  <router-link to="/" class="logo">
    <img
      v-if="dark"
      src="~/assets/images/logo-dark.png"
      alt="Bossnet dark logo"
    />
    <img v-else src="~/assets/images/logo.png" alt="Bossnet logo" />
  </router-link>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
};
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