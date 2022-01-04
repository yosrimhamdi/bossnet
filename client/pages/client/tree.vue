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
    <div ref="treeContainer" class="tree-container">
      <spinner-loading v-if="clientTree.isLoading" class="lg primary center" />
      <div v-else class="parent">
        <div class="node">
          <h4 v-if="clientParent">{{ clientParent.fullName }}</h4>
          <h4 v-else>Bossnet</h4>
          <small>Votre parent</small>
        </div>

        <div class="children">
          <template v-if="clientTree.lastParents.length">
            <div class="parent">
              <button class="btn light" @click="fetchPreviousTree">
                Voir plus
              </button>
              <div class="children">
                <clients-binary-tree :currentClient="clientTree.clients[0]" />
              </div>
            </div>
          </template>
          <clients-binary-tree v-else :currentClient="clientTree.clients[0]" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ClientBalance from "../../components/client/ClientBalance.vue";
import ClientsBinaryTree from "../../components/client/ClientsBinaryTree.vue";
import SpinnerLoading from "../../components/utilities/SpinnerLoading.vue";
import TabsNav from "../../components/utilities/TabsNav.vue";

export default {
  components: { TabsNav, ClientBalance, ClientsBinaryTree, SpinnerLoading },
  data() {
    return {
      treeShowFormat: "tree",
    };
  },
  computed: {
    client() {
      return this.$store.state.client;
    },
    clientTree() {
      return this.$store.state.clientTree;
    },
    clientParent() {
      const { parent } = this.client;
      if (parent)
        return {
          fullName: `${parent.profile.firstName} ${parent.profile.lastName}`,
        };
    },
  },
  methods: {
    scrollTreeContainerToCenter() {
      const { treeContainer } = this.$refs;
      this.$nextTick(() => {
        const scrollToX =
          treeContainer.scrollWidth / 2 - treeContainer.clientWidth / 2;
        treeContainer.scrollTo(scrollToX, 0);
      });
    },
    fetchPreviousTree() {
      const { lastParents } = this.clientTree;
      // pop last parent
      this.$store.commit("setClientTree", {
        lastParents: lastParents.slice(0, lastParents.length - 1),
      });
      // fetch by last parent
      this.$store.dispatch(
        "fetchClientTree",
        lastParents[lastParents.length - 1]._id
      );
    },
  },
  mounted() {
    this.$store.dispatch("fetchClientTree", this.client._id);
  },
  watch: {
    "clientTree.isLoading"() {
      if (!this.isLoading) this.scrollTreeContainerToCenter();
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
<style lang="scss">
// Binary tree

.tree-container {
  @apply relative block pt-8 overflow-auto;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    @apply rounded;
  }
  &::-webkit-scrollbar-thumb {
    background: rgb(184, 184, 184);
    @apply rounded;
  }

  .parent {
    @apply inline-flex flex-col items-center;
  }
  .left,
  .right {
    @apply relative inline-flex flex-col items-center p-4;
  }

  .left::before,
  .right::before {
    content: "";
    @apply absolute block top-0 w-1/2 border-t-2 h-12;
  }
  .left::before {
    @apply border-l-2 rounded-tl-lg left-1/2 border-blue-500;
  }
  .right::before {
    @apply border-r-2 rounded-tr-lg right-1/2 border-green-500;
  }

  .children {
    @apply flex mt-8;
  }

  .node {
    --node-height: 96px;
    --node-width: 160px;
    height: var(--node-height);
    width: var(--node-width);
    @apply relative bg-white flex flex-col
   items-center justify-center text-center
     rounded-lg shadow-md border p-4;
  }
  .node::before {
    content: "";
    z-index: -1;
    width: 2px;
    height: 35px;
    @apply absolute rounded-full bg-gray-600 top-full;
  }

  .left,
  .right {
    @apply relative;
    & > button {
      @apply mt-8 font-normal;
      width: max-content;
    }
  }

  .node h4 {
    @apply font-semibold;
  }
  .node small {
    @apply font-semibold mt-2;
    .left-text {
      @apply text-blue-500;
    }
    .right-text {
      @apply text-green-600;
    }
  }
}
</style>