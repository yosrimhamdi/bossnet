<template>
  <section class="tree">
    <div class="tree-header">
      <div class="info">
        <h1>
          Bienvenu{{ client.profile.gender == "f" ? "e" : "" }},
          {{ client.profile.firstName }}!
        </h1>
        <small>Format d'affichage</small>
        <tabs-nav
          :tabs="[
            {
              title: 'Arbre',
              path: '/client/tree',
            },
            {
              title: 'Tableau',
              path: '/client/tree/table',
            },
          ]"
        />
      </div>
      <client-balance />
    </div>
    <nuxt-child />
  </section>
</template>

<script>
import ClientBalance from "../../components/client/ClientBalance.vue";
import TabsNav from "../../components/utilities/TabsNav.vue";
import { scrollToElement } from "../../utils/userInteractions";

export default {
  head() {
    return {
      titleTemplate: `Espace client - Mon arbre | %s`,
    };
  },
  components: { TabsNav, ClientBalance },
  computed: {
    client() {
      return this.$store.state.client;
    },
  },
  mounted() {
    scrollToElement(document.scrollingElement);
  },
};
</script>

<style lang="scss" scoped>
.tree-header {
  @apply flex flex-col-reverse items-end w-full;
  @screen lg {
    @apply flex-row;
  }
  .info {
    @apply w-full;
    @screen lg {
      @apply w-4/6 pr-4;
    }
  }
  h1 {
    @apply text-3xl font-bold;
    @screen md {
      @apply text-4xl font-bold;
    }
  }
  small {
    @apply block text-base font-semibold mt-8 text-gray-400;
  }
}
</style>