<template>
  <div class="ads-swiper">
    <swiper :autoHideBtns="true" :autoSwipeEachSeconds="5">
      <router-link
        class="ad"
        v-for="(advertissment, i) in advertissments"
        :to="advertissment.url"
        :key="i"
      >
        <img
          :src="
            generateMediaFileSrc(
              advertissment.image.bucket,
              advertissment.image.path
            )
          "
          :alt="advertissment.title"
        />
      </router-link>
    </swiper>
  </div>
</template>

<script>
import generateMediaFileSrc from "../../utils/generateMediaFileSrc";
import Swiper from "../utilities/Swiper.vue";

export default {
  components: { Swiper },
  props: {
    advertissments: Array,
  },
  methods: {
    generateMediaFileSrc,
  },
};
</script>
<style lang="scss" scoped>
.ads-swiper {
  @apply relative w-full overflow-hidden rounded;
}
.ad {
  max-height: 400px;
  @apply w-full min-w-full overflow-hidden;
  img {
    @apply object-cover w-full h-full;
  }
}
</style>