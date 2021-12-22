<template>
  <div>
    <TheHeader />
    <main class="default-main">
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "../components/TheFooter.vue";
import TheHeader from "../components/TheHeader.vue";
export default {
  components: { TheHeader, TheFooter },
};
</script>

<style lang="scss" scoped>
.default-main {
  @screen lg {
    @apply mt-24;
  }
  @screen md {
    @apply px-12;
  }
  @apply relative py-12 px-4 mt-64  flex flex-col items-center;
}
</style>