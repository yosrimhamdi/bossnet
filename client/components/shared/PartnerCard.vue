<template>
  <router-link :to="`/partners/${partner._id}`" class="partner-card">
    <div class="content">
      <div class="img">
        <bucket-image :image="partner.logo" :alt="partner.name" />
      </div>
      <div class="details">
        <h3 :title="partner.name">{{ partner.name }}</h3>
        <small v-if="partner.discountRate">
          -{{ partner.discountRate }}%<span>Taux de remise</span>
        </small>
        <p :title="partner.description">{{ partner.description }}</p>
        <button class="btn light">
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
  components: { ArrowRightIcon, BucketImage },
  props: {
    partner: Object,
  },
};
</script>

<style lang="scss" scoped>
.partner-card {
  @screen lg {
    @apply w-1/2;
  }
  @apply block w-full p-4;
  &:hover {
    h3 {
      @apply underline text-primary;
    }
    small {
      span {
        @apply inline;
      }
    }
  }
}
.content {
  @screen md {
    @apply flex;
  }
  @apply items-start border-t pt-4;
}
.details {
  @screen md {
    @apply pl-8 w-2/3 mt-0;
  }
  @apply w-full mt-4;
}
.img {
  width: 180px;
  height: 150px;
  @apply flex items-center justify-center
  p-2 rounded-sm border shadow-sm;
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
small {
  @apply block text-primary text-base mt-2 font-semibold;
  span {
    @apply hidden text-sm ml-1 text-gray-600 font-normal;
  }
}
</style>