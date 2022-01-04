<template>
  <div class="home-page">
    <partners-swiper :partners="partners" />
    <section class="cat-ads">
      <top-categories :categories="categories" />
      <advertissments-swiper :advertissments="swiperAdvertissments" />
    </section>
    <top-offers :offers="offers" />
    <classic-advertissments :advertissments="secondSectionAdsvertissments" />
    <get-started-section />
    <classic-advertissments :advertissments="lastSectionAdsvertissments" />
    <contact-us />
  </div>
</template>

<script>
import PartnersSwiper from "../components/home/PartnersSwiper.vue";
import AdvertissmentsSwiper from "../components/home/AdvertissmentsSwiper.vue";
import TopCategories from "../components/home/TopCategories.vue";
import TopOffers from "../components/home/TopOffers.vue";
import ClassicAdvertissments from "../components/home/ClassicAdvertissments.vue";
import GetStartedSection from "../components/home/GetStartedSection.vue";
import ContactUs from "../components/shared/ContactUs.vue";
import API_ROUTES from "./../apiRoutes";
const initData = ({ partners, advertissments, offers, categories }) => ({
  partners,
  advertissments,
  offers,
  categories,
});
export default {
  components: {
    PartnersSwiper,
    TopCategories,
    AdvertissmentsSwiper,
    TopOffers,
    ClassicAdvertissments,
    GetStartedSection,
    ContactUs,
  },
  async asyncData({ $api }) {
    const homePageData = await $api.$get(API_ROUTES.getHomePageData);
    return initData(homePageData);
  },
  computed: {
    swiperAdvertissments() {
      return this.advertissments.filter((item) => item.position == "1");
    },
    secondSectionAdsvertissments() {
      return this.advertissments.filter((item) => item.position == "2");
    },
    lastSectionAdsvertissments() {
      return this.advertissments.filter((item) => item.position == "3");
    },
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  @screen xl {
    width: 1200px;
  }
  width: 100%;
  @apply flex flex-col items-center;
}
.cat-ads {
  @screen lg {
    @apply flex-row;
  }
  @apply w-full mt-12 flex items-center justify-center flex-col-reverse;
}
</style>