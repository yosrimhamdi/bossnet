<template>
  <div class="ads-swiper">
    <swiper :autoHideBtns="true" :autoSwipeEachSeconds="8">
      <template v-for="(advertissment, i) in advertissments">
        <a
          v-if="isExternUrl(advertissment.url)"
          target="_blank"
          class="ad"
          :href="advertissment.url"
          :title="advertissment.title"
          :key="i"
        >
          <bucket-image
            :image="advertissment.image"
            :alt="advertissment.title"
          />
        </a>
        <router-link
          v-else
          class="ad"
          :to="advertissment.url"
          :title="advertissment.title"
          :key="i"
        >
          <bucket-image
            :image="advertissment.image"
            :alt="advertissment.title"
          />
        </router-link>
      </template>
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
  methods: {
    isExternUrl(url) {
      return url.includes("http://") || url.includes("https://");
    },
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