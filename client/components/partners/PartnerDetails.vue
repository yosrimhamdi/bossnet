<template>
  <div class="partner-details">
    <div class="left">
      <div class="img">
        <bucket-image :image="partner.logo" :alt="partner.name" />
      </div>
      <div class="info">
        <h1>{{ partner.name }}</h1>
        <div class="categories">
          <router-link
            v-for="(category, i) in partner.categories"
            :key="i"
            :to="`/categories/${category._id}`"
          >
            {{ category.name }}
          </router-link>
        </div>
        <p>{{ partner.description }}</p>
      </div>
    </div>
    <div class="right">
      <h4 v-if="partner.discountRate" class="discound-rate">
        -{{ partner.discountRate }}%<small>Taux de remise</small>
      </h4>
      <div v-if="partner.webSiteURL" class="website">
        <small>Site web</small>
        <a :href="partner.webSiteURL" target="_blank">{{
          partner.webSiteURL
        }}</a>
      </div>
      <div class="icon-text" v-if="partner.timing">
        <clock-icon />
        <small>{{ partner.timing }}</small>
      </div>
      <div class="icon-text">
        <location-icon />
        <div>
          <template v-if="showAllAddresses">
            <small v-for="(adr, i) in partner.location.addresses" :key="i">{{
              adr
            }}</small>
          </template>
          <small v-else>{{ partner.location.addresses[0] }}</small>

          <button
            @click="showAllAddresses = true"
            v-if="partner.location.addresses.length > 1 && !showAllAddresses"
          >
            Voir tous | +{{ partner.location.addresses.length - 1 }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClockIcon from "../icons/ClockIcon.vue";
import LocationIcon from "../icons/LocationIcon.vue";
import BucketImage from "../utilities/BucketImage.vue";
export default {
  components: { LocationIcon, ClockIcon, BucketImage },
  props: {
    partner: Object,
  },
  data() {
    return {
      showAllAddresses: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.partner-details {
  @apply items-center my-12;
  @screen lg {
    @apply flex;
  }
}
.left {
  @apply items-center pt-4 w-full;
  @screen lg {
    @apply flex w-2/3;
  }
}
.right {
  min-height: 200px;
  @apply w-full  border-l-2 pl-4 flex flex-col justify-center;

  @screen lg {
    @apply w-1/3;
  }
}
.info {
  @screen lg {
    @apply w-3/4 pr-4 pl-6 py-0;
  }
  @apply w-full py-4;
}
.img {
  width: 200px;
  height: 180px;
  @apply flex items-center justify-center
  p-2 rounded-sm border shadow-sm;
}
h1 {
  @apply text-4xl font-semibold;
}
p {
  @apply my-4;
}
.discound-rate {
  @apply text-2xl font-bold text-primary;
  small {
    @apply font-normal ml-2 text-dark text-base;
  }
}
.website {
  @apply block mt-4;
  small {
    @apply font-semibold text-sm;
  }
  a {
    @apply block ml-2 text-blue-500 underline;
  }
}

.icon-text {
  @apply flex items-start my-2  font-semibold;
  svg {
    @apply w-6 h-6;
  }
  & > * {
    @apply ml-2;
  }
  small {
    @apply block text-sm mb-2;
    &:first-child {
      @apply mb-0;
    }
  }
  //   small
  button {
    @apply font-semibold text-gray-500 text-sm;
    &:hover {
      @apply underline;
    }
  }
}
.categories {
  a {
    @apply text-primary font-semibold mr-1;
    &:hover {
      @apply underline;
    }
    &::after {
      content: ",";
    }
    &:last-child::after {
      content: "";
    }
  }
}
</style>