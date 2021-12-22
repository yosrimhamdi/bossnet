<template>
  <swiper :autoHideBtns="true" :autoSwipeEachSeconds="3">
    <router-link
      v-for="(partner, i) in partners"
      :to="`/partners/${partner._id}`"
      :key="i"
    >
      <img
        :src="generateMediaFileSrc(partner.logo.bucket, partner.logo.path)"
        :alt="partner.name"
      />
    </router-link>
  </swiper>
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
img {
  max-width: 200px;
  @apply mx-8;
}
</style>