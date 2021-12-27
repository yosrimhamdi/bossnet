<template>
  <swiper
    v-if="images && arrayOfImages.length"
    class="partner-images"
    :allowScroll="true"
  >
    <bucket-image
      v-for="(image, i) in arrayOfImages"
      :key="i"
      :image="image"
      :alt="partnerName"
    />
  </swiper>
</template>

<script>
import BucketImage from "../utilities/BucketImage.vue";
import Swiper from "../utilities/Swiper.vue";

export default {
  components: { Swiper, BucketImage },
  props: {
    images: Object, //{[paths], [buckets]}
    partnerName: String,
  },
  computed: {
    arrayOfImages() {
      if (this.images)
        return this.images.paths.map((_, i) => ({
          path: this.images.paths[i],
          bucket: this.images.buckets[i],
        }));
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 250px;
  @screen md {
    height: 300px;
  }
  @screen lg {
    height: 400px;
  }
  @apply block mr-4 my-2 w-max rounded-sm shadow-sm;
}
</style>