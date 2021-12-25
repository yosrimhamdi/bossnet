<template>
  <search-input
    class="header-search-input"
    placeholder="Rechercher partenaires par nom ou categorie"
    name="Search"
    v-model="searchQuery"
    :hasChildren="!!searchQuery"
    @handleSubmit="handleSubmit"
  >
    <spinner-loading
      v-if="isLoading"
      class="center md primary"
    ></spinner-loading>
    <div v-else-if="partnersSuggestions.partners.length" class="suggestions">
      <router-link
        @click="this.searchQuery = ''"
        v-for="partner in partnersSuggestions.partners"
        :key="partner._id"
        :to="`/partners/${partner._id}`"
        >{{ partner.name }}</router-link
      >
    </div>
    <p v-else>Aucun partenaire trouvé pour "{{ searchQuery }}".</p>
  </search-input>
</template>

<script>
import API_ROUTES from "../../apiRoutes";
import SearchInput from "../forms/SearchInput.vue";
import SpinnerLoading from "../utilities/SpinnerLoading.vue";
export default {
  components: { SearchInput, SpinnerLoading },
  data() {
    return {
      searchQuery: "",
      partnersSuggestions: {
        partners: [],
        total: 0,
      },
      isLoading: false,
    };
  },
  computed: {
    cleenSearchQuery() {
      return this.searchQuery.replace("  ", " ").trim();
    },
  },
  methods: {
    async fetchPartnersSuggestions() {
      if (this.cleenSearchQuery.length) {
        this.isLoading = true;
        this.partnersSuggestions = await this.$api.$get(
          API_ROUTES.getPartnersSuggestionsBySearchQuery(this.cleenSearchQuery)
        );
        this.isLoading = false;
      }
    },
    handleSubmit() {
      if (this.cleenSearchQuery) {
        this.$router.push(`/partners?searchQuery=${this.cleenSearchQuery}`);
      }
    },
  },
  watch: {
    searchQuery() {
      clearTimeout(this.searchTypingTimeout);
      this.searchTypingTimeout = setTimeout(this.fetchPartnersSuggestions, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
.suggestions {
  a {
    @apply block py-2 px-3 border-b border-gray-100 text-sm;
    &:hover {
      @apply bg-gray-100;
    }
    &:last-child {
      @apply border-b-0;
    }
  }
}
p {
  @apply px-4;
}
</style>