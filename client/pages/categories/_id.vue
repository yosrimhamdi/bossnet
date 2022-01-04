<template>
  <div class="category">
    <breadcrumb :paths="breadcrumbPaths" />
    <div class="top">
      <h1>{{ category.name }}</h1>
      <p>{{ category.description }}</p>
    </div>
    <spinner-loading v-if="partners.isLoading" class="lg primary center" />
    <div
      v-else-if="partners.data.docs.length"
      ref="partnersContainer"
      class="partners"
    >
      <h2>Partenaires</h2>
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
    </div>
    <empty-data v-else>
      <p>Malheureusement, il n'y a pas de résultats disponibles.</p>
    </empty-data>
  </div>
</template>

<script>
import API_ROUTES from "../../apiRoutes";
import EmptyData from "../../components/shared/EmptyData.vue";
import PartnerCard from "../../components/shared/PartnerCard.vue";
import Breadcrumb from "../../components/utilities/Breadcrumb.vue";
import Paginator from "../../components/utilities/Paginator.vue";
import SpinnerLoading from "../../components/utilities/SpinnerLoading.vue";
import { scrollToElement } from "../../utils/userInteractions";
import { validateId } from "./../../utils/routeParamsValidators";

const initData = (category) => ({
  category,
  partners: {
    isLoading: true,
    data: {
      docs: [],
      /*
        totalDocs,
        page,
        totalPages
        */
    },
  },
});
export default {
  validate({ params: { id } }) {
    return validateId(id);
  },

  components: { SpinnerLoading, PartnerCard, EmptyData, Breadcrumb, Paginator },
  async asyncData({ $api, params }) {
    const response = await $api.$get(API_ROUTES.getCategoryById(params.id));
    return initData(response.category);
  },
  head() {
    return {
      titleTemplate: `${this.category.name} | %s`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.category.description,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.category.description,
        },
      ],
    };
  },
  computed: {
    breadcrumbPaths() {
      return [
        { to: "/categories", name: "Catégories" },
        {
          name: this.category.name,
        },
      ];
    },
  },
  methods: {
    async fetchPartners() {
      this.partners.isLoading = true;
      this.scrollToPartners();
      const page = Number.parseInt(this.$route.query.page) || 1;
      const resposne = await this.$api.$get(
        API_ROUTES.getPartnersByCategoryId(this.category._id, page)
      );
      this.partners.data = resposne.partners;
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
  },
};
</script>

<style lang="scss" scoped>
.category {
  @screen xl {
    width: 1200px;
  }
  width: 100%;
  @apply flex flex-col;
}
h1 {
  @screen lg {
    @apply text-5xl;
  }
  @apply text-3xl font-bold mb-4;
}
p {
  @screen lg {
    @apply text-lg;
  }
}
.top {
  @apply mb-12;
}
h2 {
  @screen lg {
    @apply text-4xl;
  }
  @apply text-2xl font-bold mb-4;
}
.partners {
  .content {
    @apply flex items-start flex-wrap;
  }
}
</style>