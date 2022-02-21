<template>
  <search-input
    class="header-search-input"
    placeholder="Rechercher partenaires par nom ou categorie"
    name="Search"
    @input="(v) => (searchQuery = formatSearchQuery(v))"
    :value="formatSearchQuery(searchQuery)"
    :hasChildren="!!searchQuery"
    @handleSubmit="handleSubmit"
  >
    <spinner-loading
      v-if="isLoading"
      class="center md primary"
    ></spinner-loading>
    <div v-else-if="partnersSuggestions.partners.length" class="suggestions">
      <button
        @click="handleSubmit"
        v-if="partnersSuggestions.total > 1"
        class="search-link"
      >
        {{ partnersSuggestions.total }} partenaires trouvés
      </button>
      <router-link
        class="search-link"
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
import { formatSearchQuery } from "../../utils/textFormatters";
import SearchInput from "../forms/SearchInput.vue";
import SpinnerLoading from "../utilities/SpinnerLoading.vue";
export default {
  components: { SearchInput, SpinnerLoading },
  data() {
    return {
      searchQuery: this.$route.query.searchQuery || "",
      partnersSuggestions: {
        partners: [],
        total: 0,
      },
      isLoading: false,
    };
  },
  computed: {
    hasMoreCount() {
      return (
        this.partnersSuggestions.total -
        this.partnersSuggestions.partners.length
      );
    },
    hasValidSearchQuery() {
      return this.searchQuery.replaceAll(" ", "").length;
    },
  },
  methods: {
    formatSearchQuery,
    async fetchPartnersSuggestions() {
      if (this.hasValidSearchQuery) {
        this.isLoading = true;
        this.partnersSuggestions = await this.$api.$get(
          API_ROUTES.getPartnersSuggestionsBySearchQuery(this.searchQuery)
        );
        this.isLoading = false;
      } else {
        this.searchQuery = "";
      }
    },
    handleSubmit() {
      if (this.hasValidSearchQuery) {
        this.$router.push(`/partners?searchQuery=${this.searchQuery}`);
      }
    },
  },
  watch: {
    searchQuery() {
      // fetch when user stop typing
      clearTimeout(this.searchTypingTimeout);
      this.searchTypingTimeout = setTimeout(this.fetchPartnersSuggestions, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
.suggestions {
  .search-link {
    @apply block w-full text-left py-2 px-3 border-b border-gray-100 text-sm;
    &:hover {
      @apply bg-gray-100;
    }
    &:last-child {
      @apply border-b-0;
    }
  }
  button {
    @apply font-semibold;
  }
}
p {
  @apply px-4;
}
</style>