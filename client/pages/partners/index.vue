<template>
  <section class="partners">
    <aside class="categories">
      <h2>Catégories</h2>
      <nav class="list">
        <ul>
          <li
            class="link"
            v-for="(category, i) in categories"
            :key="i"
            :title="category.description"
          >
            <router-link :to="`/categories/${category._id}`">{{
              category.name
            }}</router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <div ref="partnersContainer" class="partners-list">
      <breadcrumb :paths="breadcrumbPaths" />
      <spinner-loading v-if="partners.isLoading" class="lg primary center" />
      <template v-else-if="partners.data.docs.length">
        <div class="content">
          <partner-card
            v-for="partner in partners.data.docs"
            :key="partner._id"
            :partner="partner"
          />
        </div>
        <paginator
          :currentPage="partners.data.page"
          :totalPages="partners.data.totalPages"
        />
      </template>
      <empty-data v-else>
        <p>Malheureusement, il n'y a pas de résultats disponibles.</p>
      </empty-data>
    </div>
  </section>
</template>

<script>
import API_ROUTES from "../../apiRoutes";
import EmptyData from "../../components/shared/EmptyData.vue";
import PartnerCard from "../../components/shared/PartnerCard.vue";
import Breadcrumb from "../../components/utilities/Breadcrumb.vue";
import Paginator from "../../components/utilities/Paginator.vue";
import SpinnerLoading from "../../components/utilities/SpinnerLoading.vue";
import { scrollToElement } from "../../utils/userInteractions";
import { formatSearchQuery } from "../../utils/textFormatters";
const initData = (categories) => ({
  categories,
  partners: {
    isLoading: true,
    data: {
      docs: [],
      /**
       totalDocs,
        page,
        totalPages
    */
    },
  },
});
export default {
  components: { SpinnerLoading, PartnerCard, Paginator, EmptyData, Breadcrumb },

  async asyncData({ $api }) {
    const response = await $api.$get(API_ROUTES.getAllCategories);
    return initData(response.categories);
  },
  head() {
    const { searchQuery } = this.$route.query;
    return {
      titleTemplate: `Partenaires ${
        searchQuery ? `- ${searchQuery} ` : ""
      }| %s`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Partenaires de Bossnet.",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: searchQuery
            ? `Résultats de la recherche de la clé ${searchQuery}`
            : "Partenaires de Bossnet.",
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            (searchQuery ? `${searchQuery}, ` : "") +
            `${this.categories.map(({ name }) => name).join(", ")}`,
        },
      ],
    };
  },
  computed: {
    breadcrumbPaths() {
      const searchQuery =
        this.$route.query.searchQuery && this.$route.query.searchQuery;
      if (searchQuery)
        return [
          { name: "Partenaires", to: "/partners" },
          { name: "Recherche" },
          { name: searchQuery },
        ];
      return [{ name: "Partenaires" }];
    },
  },
  methods: {
    async fetchPartners() {
      this.partners.isLoading = true;
      this.scrollToPartners();
      const page = this.$route.query.page || 1,
        searchQuery = formatSearchQuery(this.$route.query.searchQuery || "");
      const response = await this.$api.$get(
        API_ROUTES.getPartnersBySearchKey(searchQuery, page)
      );
      this.partners.data = response.partners;
      this.partners.isLoading = false;
    },
    scrollToPartners() {
      this.$refs.partnersContainer &&
        scrollToElement(this.$refs.partnersContainer);
    },
  },
  mounted() {
    this.fetchPartners();
  },
  watch: {
    "$route.query.page"() {
      this.fetchPartners();
    },
    "$route.query.searchQuery"() {
      this.fetchPartners();
    },
  },
};
</script>

<style lang="scss" scoped>
.partners {
  @apply w-full flex items-start flex-wrap;
}
.categories {
  @apply inline-block sticky top-0 w-full bg-white z-10 pt-2 border-b mb-4;
  h2 {
    @apply text-2xl mb-2 font-semibold;
  }
  ul {
    @apply relative max-w-full min-w-full items-center justify-start
   overflow-auto inline-flex flex-nowrap;
  }
  .link {
    @apply block w-max text-sm
     bg-gray-50 p-2 rounded-md m-2 border shadow-sm;
    a {
      @apply block w-max;
    }
  }
  @screen lg {
    width: 300px;
    top: 1rem;
    @apply inline-block max-h-screen mb-0 
    bg-white px-4 py-6 rounded-md border shadow-md;
    h2 {
      @apply font-bold text-4xl mb-4;
    }
    ul {
      @apply block overflow-hidden;
    }
    .link {
      @apply relative block py-2 px-1 rounded-none border-0 bg-transparent
       shadow-none border-b border-gray-100 w-full;
      a {
        @apply block w-full;
      }
      &:hover {
        @apply underline;
      }
      &:last-child {
        @apply border-b-0;
      }
    }
  }
}
.partners-list {
  @screen lg {
    width: calc(100% - 300px);
    @apply pl-12;
  }
  .content {
    @apply flex items-start flex-wrap;
  }
}
.partner-card {
  @screen lg {
    @apply w-full;
  }
}
</style>