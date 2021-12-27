<template>
  <nav class="breadcrumb">
    <div class="link">
      <router-link to="/">Accueil</router-link>
    </div>
    <div v-for="(path, i) in paths" :key="i" class="link">
      /
      <router-link v-if="path.to" :to="path.to">
        {{ path.name }}
      </router-link>
      <span v-else>
        {{ path.name }}
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    paths: Array, // [{name, to?}]
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  @apply flex flex-wrap mb-4;
}
.link {
  @apply text-gray-600 mr-1;
  a:hover {
    @apply underline text-primary;
  }
  span {
    @apply text-gray-400 cursor-default;
  }
}
</style>