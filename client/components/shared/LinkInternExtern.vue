<template>
  <a v-if="isExternUrl" target="_blank" :href="url">
    <slot />
  </a>
  <router-link v-else :to="url">
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    isExternUrl() {
      return this.url.startsWith("http://") || this.url.startsWith("https://");
    },
  },
};
</script>

<style>
</style>