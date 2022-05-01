<template>
  <section class="categories">
    <breadcrumb :paths="[{ name: 'Catégories' }]" />
    <div class="top-bar">
      <h1>Catégories</h1>
      <search-input
        placeholder="Filtrer les catégories par nom"
        :hasSubmitBtn="false"
        :hasChildren="false"
        v-model="searchQuery"
      />
    </div>
    <div v-if="filteredCategories.length" class="list">
      <category-card
        v-for="(category, i) in filteredCategories"
        :key="i"
        :category="category"
      />
    </div>
    <empty-data v-else>
      <p>Aucune catégorie trouvée pour "{{ searchQuery }}".</p>
    </empty-data>
  </section>
</template>

<script>
import CategoryCard from "../../components/categories/CategoryCard.vue";
import SearchInput from "../../components/forms/SearchInput.vue";
import EmptyData from "../../components/shared/EmptyData.vue";
import Breadcrumb from "../../components/utilities/Breadcrumb.vue";
import API_ROUTES from "./../../apiRoutes";
const initData = (categories) => ({
  categories,
  searchQuery: "",
});
export default {
  components: { CategoryCard, SearchInput, EmptyData, Breadcrumb },
  async asyncData({ $api }) {
    const response = await $api.$get(API_ROUTES.getAllCategories);
    return initData(response.categories);
  },
  head() {
    return {
      titleTemplate: `Catégories | %s`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Catégories de partenaires de Bossnet.",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: "Catégories de partenaires de Bossnet.",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${this.categories.map(({ name }) => name).join(", ")}`,
        },
      ],
    };
  },
  computed: {
    filteredCategories() {
      const searchQuery = this.searchQuery.replaceAll("  ", "").toUpperCase();
      return this.categories.filter(({ name }) => {
        name = name.toUpperCase();
        const keys = searchQuery.split(" ");
        for (const key of keys) {
          if (!name.includes(key)) return false;
        }
        return true;
      });
    },
  },

}; 
</script>

<style lang="scss" scoped>
.categories {
  @apply relative block w-full mb-12;
}
.search-input {
  @screen md {
    @apply w-1/2 m-0;
  }
  @apply w-full mt-4;
}
.top-bar {
  @screen md {
    @apply mb-12;
  }
  @apply bg-white z-20 sticky top-0 py-4 mb-4 border-b flex items-center flex-wrap justify-between;
}
h1 {
  @screen md {
    @apply text-6xl;
  }
  @apply text-4xl font-bold;
}
.list {
  @apply flex items-center justify-start flex-wrap;
}
</style>