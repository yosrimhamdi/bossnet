<template>
  <div class="client-balance">
    <pocket-icon />
    <div class="details">
      <h3>Solde</h3>
      <h4>15.000 TND</h4>
      <router-link to="/payment/history" class="btn light"
        >Historiques</router-link
      >
    </div>
  </div>
</template>

<script>
import PocketIcon from "../icons/PocketIcon.vue";
export default {
  components: { PocketIcon },
};
</script>

<style lang="scss" scoped>
.client-balance {
  @apply w-full rounded border shadow p-6 mb-4
  flex items-start border-dashed;
  @screen lg {
    @apply w-2/6 mb-0;
  }
}
svg {
  width: 42px;
  height: 42px;
}
.details {
  @apply pl-4;
}
h3 {
  @apply text-xl font-bold text-gray-400;
}
h4 {
  @apply text-xl font-bold my-2;
}
</style>
<style lang="scss">
.client-balance {
  svg path {
    stroke: var(--dark-cl);
    stroke-width: 1.2px;
  }
}
</style>
