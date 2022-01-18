<template>
  <section class="balance">
    <spinner-loading v-if="isLoading" class="primary center lg" />
    <template v-else>
      <div class="balance-container">
        <client-balance-card
          title="Montant total"
          :amount="balance.totalAmount"
        />
        <client-balance-card
          class="active"
          title="<span>Solde</span><br/>Montant impayé"
          :amount="balance.unpaidAmount"
        />

        <client-balance-card
          title="Montant payé"
          :amount="balance.paidAmount"
        />
      </div>
      <h2>Historique des paiements</h2>
      <div class="payments" ref="paymentsHistoryContainer">
        <spinner-loading
          v-if="paymentsHistory.isLoading"
          class="lg center primary"
        />
        <template v-else-if="paymentsHistory.data.docs.length">
          <data-table :cols="paymentsHistoryTableCols">
            <payment-history-row
              v-for="payment in paymentsHistory.data.docs"
              :key="payment._id"
              :payment="payment"
            />
          </data-table>
          <paginator
            :currentPage="paymentsHistory.data.page"
            :totalPages="paymentsHistory.data.totalPages"
          />
        </template>
        <empty-data v-else :hasHomeLink="false">
          <p>Aucun paiement trouvé !</p>
        </empty-data>
      </div>
    </template>
  </section>
</template>

<script>
import API_ROUTES from "../../apiRoutes";
import ClientBalanceCard from "../../components/client/ClientBalanceCard.vue";
import PaymentHistoryRow from "../../components/client/PaymentHistoryRow.vue";
import EmptyData from "../../components/shared/EmptyData.vue";
import DataTable from "../../components/utilities/DataTable.vue";
import Paginator from "../../components/utilities/Paginator.vue";
import SpinnerLoading from "../../components/utilities/SpinnerLoading.vue";
import { scrollToElement } from "../../utils/userInteractions";
export default {
  components: {
    SpinnerLoading,
    ClientBalanceCard,
    DataTable,
    PaymentHistoryRow,
    Paginator,
    EmptyData,
  },
  head() {
    return {
      titleTemplate: `Espace client - Solde | %s`,
    };
  },
  data() {
    return {
      balance: {
        totalAmount: 0,
        paidAmount: 0,
        unpaidAmount: 0,
      },
      isLoading: true,
      paymentsHistory: {
        data: {
          docs: [],
          /**
            totalDocs,
            page,
            totalPages
          */
        },
        isLoading: false,
      },
    };
  },
  computed: {
    paymentsHistoryTableCols() {
      return [
        "Montant totale",
        "Montant HT",
        "Taxe",
        "Méthode de paiement",
        "Date de paiement",
      ];
    },
  },
  methods: {
    async fetchClientBalance() {
      this.isLoading = true;
      const response = await this.$api.$get(API_ROUTES.getClientBalance);
      this.balance = response.balance;
      this.isLoading = false;
    },
    async fetchClientPaymentsHistory() {
      this.paymentsHistory.isLoading = true;
      const page = this.$route.query.page || 1;
      if (page > 1) this.scrollToPaymentsHistoryContainer();
      const response = await this.$api.$get(
        API_ROUTES.getClientPaymentsHistory(page)
      );
      this.paymentsHistory.data = response.payments;
      this.paymentsHistory.isLoading = false;
    },
    scrollToPaymentsHistoryContainer() {
      scrollToElement(this.$refs.paymentsHistoryContainer);
    },
  },
  async mounted() {
    scrollToElement(document.scrollingElement);
    await this.fetchClientBalance();
    this.fetchClientPaymentsHistory();
  },
  watch: {
    "$route.query.page"() {
      this.fetchClientPaymentsHistory();
    },
  },
};
</script>

<style lang="scss" scoped>
.balance-container {
  @apply flex flex-wrap items-center;
}
h2 {
  @apply text-2xl font-bold mt-12 mb-6 text-center;
}
.payments {
  @apply block max-w-full overflow-x-auto;
}
</style>