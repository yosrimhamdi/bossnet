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
  @apply w-2/6 rounded border shadow p-6
  flex items-start border-dashed;
}
svg {
  width: 32px;
  height: 32px;
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
