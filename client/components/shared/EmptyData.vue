<template>
  <div class="container-1">
    <img src="~/assets/images/empty.png" alt="404 error" />
    <div class="details">
      <slot />
      <router-link to="/" class="btn lg primary flat"
        >Accueil
        <arrow-right-icon />
      </router-link>
    </div>
  </div>
</template>

<script>
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
export default {
  components: {
    ArrowRightIcon,
  },
};
</script>