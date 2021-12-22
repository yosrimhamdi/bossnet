<template>
  <div class="home-page">
    <partners-swiper :partners="partners" />

    <section class="cat-ads">
      <top-categories :categories="categories" />
      <advertissments-swiper :advertissments="swiperAdvertissments" />
    </section>
  </div>
</template>

<script>
import PartnersSwiper from "../components/home/PartnersSwiper.vue";
import AdvertissmentsSwiper from "../components/home/AdvertissmentsSwiper.vue";
import TopCategories from "../components/home/TopCategories.vue";
import apiRoutes from "./../apiRoutes";
export default {
  components: { PartnersSwiper, TopCategories, AdvertissmentsSwiper },
  data() {
    return {
      partners: [],
      advertissments: [],
      offers: [],
      categories: [],
    };
  },
  async asyncData({ $api }) {
    const homePageData = await $api.$get(apiRoutes.GET_HOME_PAGE_DATA);
    return homePageData;
  },

  computed: {
    swiperAdvertissments() {
      return this.advertissments.filter((item) => item.position == "1");
    },
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  max-width: 1300px;
}
.cat-ads {
  @screen lg {
    @apply flex-row;
  }
  @apply mt-12 flex items-start justify-center flex-col-reverse;
}
</style>
