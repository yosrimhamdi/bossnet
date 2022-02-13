<template>
  <section class="classic-ads">
    <link-intern-extern
      v-for="(advertissment, i) in advertissments"
      :title="advertissment.title"
      :key="i"
      class="ad"
      :url="advertissment.url"
    >
      <div class="content">
        <bucket-image :image="advertissment.image" :alt="advertissment.title" />
      </div>
    </link-intern-extern>
  </section>
</template>

<script>
import LinkInternExtern from "../shared/LinkInternExtern.vue";
import BucketImage from "../utilities/BucketImage.vue";

export default {
  components: {
    BucketImage,
    LinkInternExtern,
  },
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
.classic-ads {
  @apply relative w-full my-12 block text-center;
}
.content {
  @apply relative  m-2  rounded border-4 border-white shadow-md overflow-hidden;
}
.ad {
  @screen lg {
    @apply w-1/2;
  }
  @apply relative inline-block w-full;
}
img {
  @apply w-full h-auto rounded transform transition-transform;
  &:hover {
    transform: scale(1.01);
  }
}
</style>