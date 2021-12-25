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
          <img
            v-if="partner.logo"
            :src="generateMediaFileSrc(partner.logo.bucket, partner.logo.path)"
            :alt="partner.name"
          />
        </div>
      </router-link>
    </swiper>
  </section>
</template>

<script>
import Swiper from "../utilities/Swiper.vue";
import generateMediaFileSrc from "../../utils/generateMediaFileSrc";
export default {
  components: { Swiper },
  props: {
    partners: Array,
  },
  methods: {
    generateMediaFileSrc,
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