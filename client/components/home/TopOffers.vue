<template>
  <section class="top-offers">
    <h2><span>Meilleures</span> offres</h2>
    <swiper :allowScroll="true" :autoHideBtns="true">
      <top-offer-card v-for="(offer, i) in offers" :key="i" :offer="offer" />
    </swiper>
  </section>
</template>

<script>
import Swiper from "../utilities/Swiper.vue";
import TopOfferCard from "./TopOfferCard.vue";
export default {
  components: { Swiper, TopOfferCard },
  props: {
    offers: Array,
  },
};
</script>

<style lang="scss" scoped>
.top-offers {
  @apply relative w-full mt-12;
}
h2 {
  @apply text-5xl font-bold mb-8;
}
</style>