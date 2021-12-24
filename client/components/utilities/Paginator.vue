<template>
  <div class="paginator">
    <router-link
      v-if="this.currentPage > 1"
      :to="getToLink(this.currentPage - 1)"
      class="btn sq bg-gray-50 border mr-3"
    >
      <arrow-small-bottom-icon class="transform rotate-90" />
    </router-link>

    <router-link
      v-for="(page, i) in ranges[0]"
      :key="i"
      :to="getToLink(page)"
      class="btn sq border bg-gray-100 mr-2"
      :class="{ light: isCurrentPage(page) }"
      >{{ page }}</router-link
    >
    <template v-if="ranges[1]">
      <span>...</span>
      <router-link
        v-for="(page, i) in ranges[1]"
        :key="i"
        :to="getToLink(page)"
        class="btn sq border bg-gray-100 mr-2"
        :class="{ light: isCurrentPage(page) }"
        >{{ page }}</router-link
      >
    </template>
    <template v-if="ranges[2]">
      <span>...</span>
      <router-link
        v-for="(page, i) in ranges[2]"
        :key="i"
        :to="getToLink(page)"
        class="btn sq border bg-gray-100 mr-2"
        :class="{ light: isCurrentPage(page) }"
        >{{ page }}</router-link
      >
    </template>
    <router-link
      v-if="this.currentPage < this.totalPages"
      :to="getToLink(this.currentPage + 1)"
      class="btn sq border bg-gray-50 ml-1"
    >
      <arrow-small-bottom-icon class="transform -rotate-90" />
    </router-link>
  </div>
</template>

<script>
import ArrowSmallBottomIcon from "../icons/ArrowSmallBottomIcon.vue";
export default {
  components: { ArrowSmallBottomIcon },
  props: {
    currentPage: Number,
    totalPages: Number,
  },
  computed: {
    ranges() {
      if (this.totalPages < 9) {
        return [Array.from({ length: this.totalPages }, (_, i) => i + 1)];
      }
      const center = Number.parseInt(this.totalPages / 2);
      if (this.currentPage < 3) {
        return [[1, 2, 3], [center], [this.totalPages]];
      }
      if (this.currentPage == this.totalPages) {
        return [[1], [center - 1, center, center + 1], [this.totalPages]];
      }
      if (this.currentPage < this.totalPages - 2) {
        return [
          [1],
          [this.currentPage - 1, this.currentPage, this.currentPage + 1],
          [this.totalPages],
        ];
      }
      return [[1], [this.currentPage], [this.totalPages]];
    },
  },
  methods: {
    getToLink(page) {
      return `?page=${page}`;
    },
    isCurrentPage(page) {
      return this.currentPage == page;
    },
  },
};
</script>

<style lang="scss" scoped>
.paginator {
  @apply mt-4 flex justify-center items-center;
}
span {
  @apply mr-2;
}
a {
  @apply my-2;
}
</style>