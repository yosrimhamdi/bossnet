<template>
  <router-link :to="`/partners/offers/${offer._id}`" class="offer-card">
    <div class="content">
      <div class="img">
        <bucket-image :image="offer.image" :alt="offer.title" />
      </div>
      <div class="details">
        <h3>{{ offer.title }}</h3>
        <span v-if="endDate">
          Valable jusqu'au <span>{{ endDate }}</span>
        </span>
        <p>{{ offer.description }}</p>
        <button class="btn white-primary no-sh">
          Voir plus
          <arrow-right-icon />
        </button>
      </div>
    </div>
  </router-link>
</template>

<script>
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
import BucketImage from "../utilities/BucketImage.vue";
export default {
  components: { BucketImage, ArrowRightIcon },
  props: {
    offer: Object,
  },
  computed: {
    endDate() {
      if (this.offer.duration.endDate) {
        return new Date(this.offer.duration.endDate).toLocaleDateString();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.offer-card {
  @apply w-full p-2;
  @screen lg {
    @apply block p-4 w-1/2;
  }
  &:hover {
    h3 {
      @apply text-primary underline;
    }
  }
}
.content {
  @apply items-center rounded-md
    border p-4 shadow-sm;
  @screen sm {
    @apply flex;
  }
}

.img {
  width: 100%;
  height: auto;
  @apply shadow-sm mb-4;
  @screen sm {
    width: 220px;
    height: 220px;
    @apply mb-0;
  }
  img {
    @apply h-full w-full rounded-sm object-cover;
  }
}
.details {
  width: 100%;
  @screen sm {
    width: calc(100% - 220px);
  }
  @apply pl-4;
}
h3 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  @apply text-xl font-semibold;
}
p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 80px;
  @apply break-words  my-4;
}
span {
  @apply text-sm;
  span {
    @apply text-primary;
  }
}
</style>