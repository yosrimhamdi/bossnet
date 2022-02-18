<template>
  <div>
    <OfflineStatus />
    <TheHeader />
    <main class="default-main">
      <Nuxt />
    </main>
    <TheFooter />
    <notifications />
  </div>
</template>

<script>
import OfflineStatus from "../components/OfflineStatus.vue";
import TheFooter from "../components/TheFooter.vue";
import TheHeader from "../components/TheHeader.vue";
export default {
  components: { TheHeader, TheFooter, OfflineStatus },
};
</script>

<style lang="scss" scoped>
.default-main {
  @apply relative py-12 px-2 mt-52  flex flex-col items-center;
  @screen md {
    @apply px-4 mt-56;
  }
  @screen lg {
    @apply mt-24;
  }
}
</style>