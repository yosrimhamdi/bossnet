<template>
  <div class="tabs-nav">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="$emit('input', tab.id)"
      :class="{ active: tab.id == value }"
    >
      {{ tab.title }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: String, // selected id (pass by v-model)
    tabs: Array, // {id, title}
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
button {
  top: 2px;
  @apply block relative font-semibold pl-2 pr-6 py-2
  border-b-2 transition-colors;
  &.active {
    @apply text-primary border-primary;
  }
}
</style>