<template>
  <div class="offer">
    <img
      v-if="offer.image"
      :data-src="generateMediaFileSrc(offer.image.bucket, offer.image.path)"
      :alt="offer.title"
      v-lazy-load
    />
    <div class="details">
      <h3 :title="offer.title">{{ offer.title }}</h3>
      <router-link
        :to="`/offers/${offer._id}`"
        class="btn no-sh white-primary no-pad"
      >
        Voir plus <arrow-right-icon />
      </router-link>
    </div>
  </div>
</template>

<script>
import generateMediaFileSrc from "../../utils/generateMediaFileSrc";
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
export default {
  components: { ArrowRightIcon },
  props: {
    offer: Object,
  },
  computed: {},
  methods: {
    generateMediaFileSrc,
  },
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