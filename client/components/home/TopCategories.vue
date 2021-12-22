<template>
  <div class="top-categories">
    <div class="shape" />
    <div class="content">
      <h2>Catégories</h2>

      <ul>
        <li v-for="(category, i) in categories" :key="i">
          <router-link :to="`/categories/${category._id}`">
            {{ category.name }}
          </router-link>
        </li>
      </ul>
      <router-link to="/categories" class="btn no-sh md white-primary no-pad">
        Voir tous <arrow-right-icon />
      </router-link>
    </div>
  </div>
</template>

<script>
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
export default {
  components: { ArrowRightIcon },
  props: {
    categories: Array,
  },
};
</script>

<style lang="scss" scoped>
.top-categories {
  @screen lg {
    width: 350px;
    @apply mr-8 mt-0;
  }
  @screen xl {
    width: 400px;
  }
  @apply relative pt-6 pl-6 my-12 w-full;
}
.shape {
  @apply absolute bg-primary top-0 left-0 z-0 w-4/6 h-1/3 rounded;
}
.content {
  @apply relative p-8 bg-white border 
  rounded shadow-sm;
}
h2 {
  @apply text-4xl font-bold mb-8;
}
ul {
  @apply pl-2;
  li {
    @apply text-gray-600 font-normal py-2 border-b border-gray-200;
    &:hover {
      @apply underline;
    }
  }
}
.btn {
  @apply ml-2 mt-4;
}
</style>