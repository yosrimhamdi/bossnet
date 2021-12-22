<template>
  <section>
    <swiper :allowScroll="true" :autoHideBtns="true" :autoSwipeEachSeconds="3">
      <router-link
        v-for="(partner, i) in partners"
        :to="`/partners/${partner._id}`"
        :key="i"
        :title="partner.name"
      >
        <div class="img">
          <img
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
.img {
  max-width: 180px;
  max-height: 100px;
  @apply block mx-8 w-96;
}
img {
  @apply w-full;
}
</style>