<template>
  <div class="error-page">
    <img src="~/assets/images/error404.png" alt="404 error" />
    <div class="details">
      <h1>WHOOPS!</h1>
      <p>Désolé, la page que vous recherchez n'existe pas.</p>
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
