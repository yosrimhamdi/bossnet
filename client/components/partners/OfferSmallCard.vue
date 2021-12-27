<template>
  <router-link :to="`/partners/offers/${offer._id}`" class="offer">
    <bucket-image :image="offer.image" :alt="offer.title" />
    <div class="details">
      <h3 :title="offer.title">{{ offer.title }}</h3>
      <button class="btn no-sh white-primary no-pad">
        Voir plus <arrow-right-icon />
      </button>
    </div>
  </router-link>
</template>

<script>
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
import BucketImage from "../utilities/BucketImage.vue";
export default {
  components: { ArrowRightIcon, BucketImage },
  props: {
    offer: Object,
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.offer {
  @screen md {
    min-width: 300px;
    max-width: 300px;
  }
  min-width: 250px;
  // max-width: 300px;
  @apply bg-white border rounded mr-6
   max-w-full overflow-hidden p-4 mb-2 shadow-sm;
  &:hover {
    h3 {
      @apply underline;
    }
  }
}
img {
  @screen md {
    max-height: 300px;
  }
  max-height: 250px;
  @apply rounded;
}
.details {
  @apply pt-4;
}
h3 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 45px;
  @apply mb-4;
}
</style>