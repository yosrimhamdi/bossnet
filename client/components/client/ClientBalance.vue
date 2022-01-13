<template>
  <div v-if="!isLoading" class="client-balance">
    <pocket-icon class="pocket" />
    <div class="details">
      <h3>Solde</h3>
      <h4>{{ unpaidAmount.toLocaleString() }} TND</h4>
      <router-link to="/client/balance" class="btn light"
        >Voir plus
        <arrow-right-icon />
      </router-link>
    </div>
  </div>
</template>

<script>
import API_ROUTES from "../../apiRoutes";
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
import PocketIcon from "../icons/PocketIcon.vue";
export default {
  components: { PocketIcon, ArrowRightIcon },
  data() {
    return {
      unpaidAmount: 0,
      isLoading: true,
    };
  },
  methods: {
    async fetchClientBalance() {
      this.isLoading = true;
      const response = await this.$api.$get(API_ROUTES.getClientBalance);
      this.unpaidAmount = response.balance.unpaidAmount;
      this.isLoading = false;
    },
  },
  mounted() {
    this.fetchClientBalance();
  },
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
svg.pocket {
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
  svg.pocket path {
    stroke: var(--dark-cl);
    stroke-width: 1.2px;
  }
}
</style>
