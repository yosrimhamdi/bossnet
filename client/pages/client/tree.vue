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
          v-model="treeShowFormat"
          :tabs="[
            {
              id: 'tree',
              title: 'Arbre',
            },
            {
              id: 'table',
              title: 'Tableau',
            },
          ]"
        />
      </div>
      <client-balance />
    </div>
    <client-tree v-if="treeShowFormat == 'tree'" />
  </section>
</template>

<script>
import ClientBalance from "../../components/client/ClientBalance.vue";
import ClientTree from "../../components/client/ClientTree.vue";
import TabsNav from "../../components/utilities/TabsNav.vue";

export default {
  components: { TabsNav, ClientBalance, ClientTree },
  data() {
    return {
      treeShowFormat: "tree",
    };
  },
  computed: {
    client() {
      return this.$store.state.client;
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-header {
  @apply flex items-end w-full;
  .info {
    @apply w-4/6 pr-4;
  }
  h1 {
    @apply text-4xl font-bold;
  }
  small {
    @apply block text-base font-semibold mt-8 text-gray-400;
  }
}
</style>