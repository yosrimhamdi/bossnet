<template>
  <div class="balance-card">
    <div>
      <h3 v-html="title" />
      <h4>{{ amount.toLocaleString() }} TND</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    amount: Number,
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.balance-card {
  @apply relative w-full p-2;
  @screen md {
    @apply w-1/3 h-52  p-4;
  }
  & > div {
    @apply bg-white shadow rounded-md my-2 px-4 py-6 border border-dashed
  flex flex-col items-center justify-center w-full h-full;

    &:last-child {
      @apply mr-0;
    }
  }
  &.active > div {
    @apply border-primary shadow-md;
  }
}
h3 {
  @apply font-semibold mb-2 text-gray-500 text-center;
}
h4 {
  @apply text-3xl font-bold my-2 text-center;
}
</style>