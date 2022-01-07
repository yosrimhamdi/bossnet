<template>
  <div class="tabs-nav">
    <router-link
      v-for="(tab, i) in tabs"
      :key="i"
      :to="tab.path"
      :class="{ active: $route.path == tab.path }"
    >
      {{ tab.title }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array, // {title, path}
  },
};
</script>
<style lang="scss" scoped>
.tabs-nav {
  @apply relative w-full border-b-2 flex 
  items-center;
  &.center {
    @apply justify-center;
    button {
      @apply px-4;
    }
  }
  &.end {
    @apply justify-end;
    button {
      @apply pl-6 pr-2;
    }
  }
}
a {
  top: 2px;
  @apply block relative font-semibold pl-2 pr-6 py-2
  border-b-2 transition-colors;
  &.active {
    @apply text-primary border-primary;
  }
}
</style>