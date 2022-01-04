<template>
  <section class="client" v-if="client">
    <client-only placeholder="Chargement...">
      <client-aside />
      <div class="content">
        <nuxt-child />
      </div>
    </client-only>
  </section>
</template>

<script>
import ClientsBinaryTree from "../components/client/ClientsBinaryTree.vue";
export default {
  components: { ClientsBinaryTree },
  middleware: "authenticated",
  data() {
    return {
      arrayTree: [],
      isLoading: true,
    };
  },
  computed: {
    client() {
      return this.$store.state.client;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.client {
  --aside-width: 300px;
  @apply flex items-start w-full;
}
.content {
  width: calc(100% - var(--aside-width));
  @apply block  p-4;
}
</style>