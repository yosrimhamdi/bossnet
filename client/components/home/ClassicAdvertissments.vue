<template>
  <section class="classic-ads">
    <router-link
      class="ad"
      v-for="(advertissment, i) in advertissments"
      :to="advertissment.url"
      :key="i"
      :title="advertissment.title"
    >
      <div class="content">
        <img
          v-if="advertissment.image"
          :data-src="
            generateMediaFileSrc(
              advertissment.image.bucket,
              advertissment.image.path
            )
          "
          :alt="advertissment.title"
          v-lazy-load
        />
      </div>
    </router-link>
  </section>
</template>

<script>
import generateMediaFileSrc from "../../utils/generateMediaFileSrc";

export default {
  props: {
    advertissments: Array,
  },
  methods: {
    generateMediaFileSrc,
  },
};
</script>

<style lang="scss" scoped>
.classic-ads {
  @apply relative w-full my-12 block text-center;
}
.content {
  @apply transform m-2 p-2 rounded border shadow-md;
  &:hover {
    transform: scale(1.01);
  }
}
.ad {
  @screen lg {
    @apply w-1/2;
  }
  @apply relative inline-block w-full;
}
img {
  @apply w-full h-auto rounded;
}
</style>