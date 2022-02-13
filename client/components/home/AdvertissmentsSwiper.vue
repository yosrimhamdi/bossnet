<template>
  <div class="ads-swiper">
    <swiper :autoHideBtns="true" :autoSwipeEachSeconds="8">
      <link-intern-extern
        v-for="(advertissment, i) in advertissments"
        :title="advertissment.title"
        :key="i"
        class="ad"
        :url="advertissment.url"
      >
        <bucket-image :image="advertissment.image" :alt="advertissment.title" />
      </link-intern-extern>
    </swiper>
  </div>
</template>

<script>
import LinkInternExtern from "../shared/LinkInternExtern.vue";
import BucketImage from "../utilities/BucketImage.vue";
import Swiper from "../utilities/Swiper.vue";

export default {
  components: { Swiper, BucketImage, LinkInternExtern },
  props: {
    advertissments: Array,
  },
};
</script>
<style lang="scss" scoped>
.ads-swiper {
  @apply block relative w-full overflow-hidden rounded;
}
.ad {
  @apply w-full min-w-full overflow-hidden;
  img {
    @apply object-cover w-full h-full;
  }
}
</style>