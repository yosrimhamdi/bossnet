<template>
  <section class="partners-swiper">
    <swiper :autoHideBtns="true" :autoSwipeEachSeconds="7">
      <router-link
        v-for="(partner, i) in partners"
        :to="`/partners/${partner._id}`"
        :key="i"
        :title="partner.name"
      >
        <div class="img">
          <bucket-image
            :image="partner.logo"
            :alt="partner.name"
            :isLazy="false"
          />
        </div>
      </router-link>
    </swiper>
  </section>
</template>

<script>
import Swiper from "../utilities/Swiper.vue";
import BucketImage from "../utilities/BucketImage.vue";

export default {
  components: { Swiper, BucketImage },
  props: {
    partners: Array,
  },
};
</script>

<style lang="scss" scoped>
.partners-swiper {
  @apply w-full;
}
.img {
  @screen lg {
    width: 120px;
  }
  width: 100px;
  @apply block mx-8;
}
img {
  @apply w-full;
}
</style>