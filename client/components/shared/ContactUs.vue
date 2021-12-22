<template>
  <section class="contact-us">
    <h2>
      Contactez-nous pour
      <span>plus</span> d'informations
    </h2>
    <router-link to="/contact" class="btn primary lg">
      Contactez-nous
      <arrow-right-icon />
    </router-link>
  </section>
</template>

<script>
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
export default {
  components: { ArrowRightIcon },
};
</script>

<style lang="scss" scoped>
.contact-us {
  @apply flex items-center justify-center flex-col my-4;
}
h2 {
  @screen lg {
    line-height: 30px;
    @apply text-5xl;
  }
  max-width: 600px;
  @apply text-4xl text-center font-bold mb-12;
}
</style>