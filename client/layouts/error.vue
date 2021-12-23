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
