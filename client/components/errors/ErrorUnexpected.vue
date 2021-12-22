<template>
  <div class="error-page">
    <img src="~/assets/images/errorUnexpected.png" alt="Unexpected error" />
    <div class="details">
      <h1>WHOOPS!</h1>
      <p>
        Désolé, une erreur inattendue s'est produite,<br />
        veuillez réessayer plus tard.
      </p>
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
  components: { ArrowRightIcon },
};
</script>
