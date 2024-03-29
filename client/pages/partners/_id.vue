<template>
  <section class="partner">
    <breadcrumb :paths="breadcrumbPaths" />
    <div
      class="map"
      v-if="partner.location.embedMapIframe"
      v-html="sanitizeHtml(partner.location.embedMapIframe)"
    />
    <partner-details :partner="partner" />
    <partner-images :images="partner.images" :partnerName="partner.name" />
    <partner-offers id="offers" :partnerId="partner._id" />
  </section>
</template>

<script>
import API_ROUTES from "../../apiRoutes";
import ClockIcon from "../../components/icons/ClockIcon.vue";
import LocationIcon from "../../components/icons/LocationIcon.vue";
import PartnerDetails from "../../components/partners/PartnerDetails.vue";
import PartnerImages from "../../components/partners/PartnerImages.vue";
import PartnerOffers from "../../components/partners/PartnerOffers.vue";
import Breadcrumb from "../../components/utilities/Breadcrumb.vue";
import sanitizeHtml from "sanitize-html"; // clean html and prevent xss attacks
import { validateId } from "./../../utils/routeParamsValidators";
const initData = (partner) => ({
  partner,
  offers: {
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
  validate({ params: { id } }) {
    return validateId(id);
  },
  components: {
    Breadcrumb,
    ClockIcon,
    LocationIcon,
    PartnerDetails,
    PartnerImages,
    PartnerOffers,
  },
  async asyncData({ $api, params }) {
    const { partner } = await $api.$get(API_ROUTES.getPartnerById(params.id));
    return initData(partner);
  },
  head() {
    return {
      titleTemplate: `${this.partner.name} | %s`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.partner.description,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.partner.description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${this.partner.categories
            .map(({ name }) => name)
            .join(", ")}`,
        },
      ],
    };
  },
  computed: {
    breadcrumbPaths() {
      return [
        { name: "Partenaires", to: "/partners" },
        {
          name: this.partner.name,
        },
      ];
    },
  },
  methods: {
    sanitizeHtml(htmlContent) {
      return sanitizeHtml(htmlContent, {
        allowedTags: ["iframe"],
        allowedAttributes: {
          iframe: ["src", "class", "style", "width", "height"],
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.partner {
  @screen xl {
    width: 1200px;
  }
  width: 100%;
  @apply flex flex-col;
}
</style>
<style lang="scss">
.map {
  iframe {
    @apply w-full rounded-md bg-gray-100;
  }
}
</style>