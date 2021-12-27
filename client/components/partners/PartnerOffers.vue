<template>
  <section class="offers">
    <spinner-loading v-if="isLoading" class="lg primary center" />
    <div v-else-if="offers.docs.length" ref="offersContainer" class="content">
      <h2>Offres</h2>
      <div class="list">
        <offer-card
          v-for="offer in offers.docs"
          :key="offer._id"
          :offer="offer"
        />
      </div>
      <paginator :currentPage="offers.page" :totalPages="offers.totalPages" />
    </div>
  </section>
</template>

<script>
import API_ROUTES from "../../apiRoutes";
import { scrollToElement } from "../../utils/userInteractions";
import Paginator from "../utilities/Paginator.vue";
import SpinnerLoading from "../utilities/SpinnerLoading.vue";
import OfferCard from "./OfferCard.vue";
export default {
  components: {
    OfferCard,
    Paginator,
    SpinnerLoading,
  },
  props: {
    partnerId: String,
  },
  data() {
    return {
      isLoading: true,
      offers: {
        docs: [],
        /*
        totalDocs,
        page,
        totalPages
        */
      },
    };
  },
  methods: {
    async fetchPartnerOffers() {
      this.isLoading = true;
      this.scrollToOffers();
      const page = this.$route.query.page || 1;
      const response = await this.$api.$get(
        API_ROUTES.getOffersByPartnerId(this.partnerId, page)
      );
      this.offers = response.offers;
      this.isLoading = false;
    },
    scrollToOffers() {
      this.$refs.offersContainer && scrollToElement(this.$refs.offersContainer);
    },
  },
  mounted() {
    this.fetchPartnerOffers();
  },
  watch: {
    "$route.query.page"() {
      this.fetchPartnerOffers();
    },
  },
};
</script>

<style lang="scss" scoped>
.offers {
  @apply my-8;
}
h2 {
  @screen lg {
    @apply text-4xl;
  }
  @apply text-2xl font-bold mb-4 pb-1 border-b;
}
.list {
  @apply flex items-center flex-wrap;
}
</style>