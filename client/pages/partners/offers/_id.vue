<template>
  <section class="offer">
    <breadcrumb :paths="breadcrumbPaths" />
    <div class="content">
      <bucket-image :image="offer.image" :alt="offer.name" />
      <div class="details">
        <h1>{{ offer.title }}</h1>
        <span v-if="endDate">
          Valable jusqu'au <span>{{ endDate }}</span>
        </span>
        <router-link :to="`/partners/${offer.partner._id}`">{{
          offer.partner.name
        }}</router-link>

        <p>{{ offer.description }}</p>
      </div>
    </div>
    <section v-if="offer.relatedOffers.length" class="related-offers">
      <h2>Offres similaires</h2>
      <swiper :allowScroll="true" :autoHideBtns="true">
        <offer-small-card
          v-for="(offer, i) in offer.relatedOffers"
          :key="i"
          :offer="offer"
        />
      </swiper>
    </section>
  </section>
</template>

<script>
import API_ROUTES from "../../../apiRoutes";
import Breadcrumb from "../../../components/utilities/Breadcrumb.vue";
import BucketImage from "../../../components/utilities/BucketImage.vue";
import Swiper from "../../../components/utilities/Swiper.vue";
import OfferSmallCard from "../../../components/partners/OfferSmallCard.vue";
const initData = (offer) => ({ offer });
export default {
  components: { BucketImage, Breadcrumb, Swiper, OfferSmallCard },
  async asyncData({ $api, params }) {
    const response = await $api.$get(API_ROUTES.getPartnerOfferById(params.id));
    return initData(response.offer);
  },
  computed: {
    endDate() {
      if (this.offer.duration.endDate) {
        return new Date(this.offer.duration.endDate).toLocaleDateString();
      }
    },

    breadcrumbPaths() {
      const partnerTo = `/partners/${this.offer.partner._id}`;
      return [
        { name: "Partenaires", to: "/partners" },
        {
          name: this.offer.partner.name,
          to: partnerTo,
        },
        { name: "offres", to: partnerTo + "#offers" },
        {
          name: this.offer.title,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.offer {
  @screen xl {
    width: 1200px;
  }
  width: 100%;
  @apply flex flex-col;
}
h1 {
  @apply text-4xl font-semibold;
}
p {
  @apply my-4;
}
.content {
  @apply mt-4;
  @screen lg {
    @apply flex items-center;
  }
  img {
    @apply w-full shadow-sm rounded-sm mb-4;
    @screen lg {
      width: 500px;
      @apply mb-0;
    }
  }
  span {
    @apply text-sm block;
    span {
      @apply text-primary inline;
    }
  }
  .details {
    @screen lg {
      @apply pl-8;
    }
    a {
      @apply text-primary font-semibold;
      &:hover {
        @apply underline;
      }
    }
  }
}
.related-offers {
  @apply relative w-full mt-12;
  h2 {
    @apply text-4xl font-bold mb-8;
  }
}
</style>