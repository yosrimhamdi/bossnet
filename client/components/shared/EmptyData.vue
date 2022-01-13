<template>
  <div class="container-1">
    <img src="~/assets/images/empty.png" alt="404 error" />
    <div class="details">
      <slot />
      <router-link v-if="hasHomeLink" to="/" class="btn md primary">
        <arrow-right-icon class="left transform rotate-180" />
        Accueil
      </router-link>
    </div>
  </div>
</template>

<script>
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
export default {
  props: {
    hasHomeLink: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    ArrowRightIcon,
  },
};
</script>