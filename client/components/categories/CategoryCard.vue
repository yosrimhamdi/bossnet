<template>
  <router-link :to="`/categories/${category._id}`" class="category-card">
    <div class="content">
      <h3>{{ category.name }}</h3>
      <p :title="category.description">{{ category.description }}</p>

      <button class="btn light">Voir partenaires <arrow-right-icon /></button>
    </div>
  </router-link>
</template>

<script>
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";

export default {
  components: { ArrowRightIcon },
  props: {
    category: Object,
  },
};
</script>

<style lang="scss" scoped>
.category-card {
  --height: 280px;

  @screen lg {
    @apply w-1/3;
  }
  @apply w-full p-4;
}
.content {
  height: var(--height);
  @apply bg-white border shadow-sm p-6 rounded-md flex flex-col justify-center items-start;
  &:hover {
    @apply shadow-lg;
    h3 {
      @apply underline text-primary;
    }
  }
}
h3 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  @apply text-xl font-semibold;
}
p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 80px;
  @apply break-words  my-8;
}
</style>