<template>
  <section v-if="homePageCard" class="get-started">
    <div v-if="image" class="img">
      <div class="shape" />
      <bucket-image alt="Bossnet" :image="image" />
    </div>
    <div class="details">
      <h2 v-if="title">{{ title }}</h2>
      <p v-if="description">
        {{ description }}
      </p>
      <link-intern-extern :url="url" class="btn dark md">
        Voir plus
        <arrow-right-icon />
      </link-intern-extern>
    </div>
  </section>
</template>

<script>
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
import LinkInternExtern from "../shared/LinkInternExtern.vue";
import BucketImage from "../utilities/BucketImage.vue";
export default {
  components: { ArrowRightIcon, BucketImage, LinkInternExtern },
  computed: {
    homePageCard() {
      return this.$store.state.siteSettings.homePageCard;
    },
    title() {
      return this.homePageCard.title;
    },
    description() {
      return this.homePageCard.description;
    },
    url() {
      return this.homePageCard.url;
    },
    image() {
      return this.$store.state.siteSettings.homePageCardImage;
    },
  },
};
</script>

<style lang="scss" scoped>
.get-started {
  @screen lg {
    @apply px-8 pt-24 pb-12 items-start w-full;
  }
  @apply relative flex items-center justify-center
  p-4 bg-gray-100 rounded-md shadow-md border flex-wrap;
}
.img {
  max-width: 500px;
  @apply relative block  p-6;
}
img {
  @apply relative z-10 shadow-md;
}
.shape {
  @apply absolute bg-dark top-0 right-0 z-0 w-4/6 h-1/3 rounded;
}
.details {
  max-width: 500px;
  @screen lg {
    @apply p-12;
  }
}
h2 {
  @screel lg {
    @apply text-5xl;
  }
  @apply text-3xl font-bold;
}
p {
  @screen md {
    @apply text-lg;
  }
  @apply my-8;
}
</style>