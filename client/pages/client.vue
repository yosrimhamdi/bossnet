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
  head() {
    return {
      titleTemplate: `Espace client | %s`,
    };
  },
  data() {
    return {
      showAside:
        process.client && localStorage.clientShowAside == "false"
          ? false
          : true,
    };
  },
  computed: {
    client() {
      return this.$store.state.client;
    },
  },
  watch: {
    showAside() {
      localStorage.clientShowAside = this.showAside;
    },
  },
};
</script>

<style lang="scss" scoped>
.client {
  --aside-width: 0px;
  aside {
    @apply hidden;
  }
  @screen lg {
    --aside-width: 300px;
    &.hide-aside {
      --aside-width: 80px;
    }
    aside {
      @apply block;
    }
  }
  @apply flex items-start w-full;
}
.content {
  width: calc(100% - var(--aside-width));
  @apply block;
  @screen lg {
    @apply px-4;
  }
}
</style>