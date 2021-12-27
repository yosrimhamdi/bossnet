<template>
  <section class="get-started">
    <div class="img">
      <div class="shape" />
      <img
        data-src="~/assets/images/getStarted.png"
        alt="Bossnet"
        v-lazy-load
      />
    </div>
    <div class="details">
      <h2>Rejoignez notre équipe pour faire du <span>profit</span></h2>
      <p>
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document, Lorem ipsum
        is a placeholder text commonly used to demonstrate the visual form of a
        document.
      </p>
      <router-link to="/signup" class="btn dark md">
        S'inscrire
        <arrow-right-icon />
      </router-link>
    </div>
  </section>
</template>

<script>
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
export default {
  components: { ArrowRightIcon },
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