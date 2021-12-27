<template>
  <img v-if="isLazy" :data-src="imageSrc" :alt="alt" v-lazy-load />
  <img v-else :src="imageSrc" :alt="alt" />
</template>

<script>
import generateMediaFileSrc from "../../utils/generateMediaFileSrc";
generateMediaFileSrc;
export default {
  props: {
    image: Object, // {path, bucket}
    isLazy: {
      type: Boolean,
      default: true,
    },
    alt: String,
  },
  computed: {
    imageSrc() {
      if (this.image)
        return generateMediaFileSrc(this.image.bucket, this.image.path);
    },
  },
};
</script>

<style>
</style>