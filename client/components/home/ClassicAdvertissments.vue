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
        <bucket-image :image="advertissment.image" :alt="advertissment.title" />
      </div>
    </router-link>
  </section>
</template>

<script>
import BucketImage from "../utilities/BucketImage.vue";

export default {
  components: {
    BucketImage,
  },
  props: {
    advertissments: Array,
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