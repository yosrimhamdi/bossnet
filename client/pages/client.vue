<template>
  <section class="client" v-if="client" :class="{ 'hide-aside': !showAside }">
    <client-only placeholder="Chargement...">
      <client-aside
        :showAside="showAside"
        @toggleAside="showAside = !showAside"
      />
      <div class="content">
        <nuxt-child />
      </div>
    </client-only>
  </section>
</template>

<script>
export default {
  middleware: "authenticated",
  data() {
    return {
      showAside: true,
    };
  },
  computed: {
    client() {
      return this.$store.state.client;
    },
  },
};
</script>

<style lang="scss" scoped>
.client {
  --aside-width: 300px;
  &.hide-aside {
    --aside-width: 80px;
  }
  @apply flex items-start w-full;
}
.content {
  width: calc(100% - var(--aside-width));
  @apply block  p-4;
}
</style>