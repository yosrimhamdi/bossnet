<template>
  <div class="ads-swiper">
    <swiper :autoHideBtns="true" :autoSwipeEachSeconds="8">
      <router-link
        class="ad"
        v-for="(advertissment, i) in advertissments"
        :to="advertissment.url"
        :key="i"
        :title="advertissment.title"
      >
        <bucket-image :image="advertissment.image" :alt="advertissment.title" />
      </router-link>
    </swiper>
  </div>
</template>

<script>
import BucketImage from "../utilities/BucketImage.vue";
import Swiper from "../utilities/Swiper.vue";

export default {
  components: { Swiper, BucketImage },
  props: {
    advertissments: Array,
  },
};
</script>
<style lang="scss" scoped>
.ads-swiper {
  @apply block bg-gray-300 relative w-full overflow-hidden rounded;
}
.ad {
  @apply w-full min-w-full overflow-hidden;
  img {
    @apply object-cover w-full h-full;
  }
}
</style>