<template>
  <error-404 v-if="error.statusCode === 404" />
  <error-unexpected v-else />
</template>

<script>
import Error404 from "../components/errors/Error404.vue";
import ErrorUnexpected from "../components/errors/ErrorUnexpected.vue";
export default {
  components: { Error404, ErrorUnexpected },
  props: ["error"],
  layout: "error",
};
</script>

<style lang="scss" >
.error-page {
  @apply flex flex-col items-center justify-center px-4 pb-12;
  .details {
    @apply text-center;
  }
  img {
    width: 800px;
    max-width: 100%;
  }
  h1 {
    @apply text-6xl font-black;
  }
  p {
    @apply text-lg font-semibold py-8;
  }
}
</style>