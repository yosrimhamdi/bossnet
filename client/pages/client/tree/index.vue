<template>
  <div ref="treeContainer" class="tree-container">
    <spinner-loading v-if="isLoading" class="lg primary center" />
    <div v-else class="parent">
      <div
        class="node"
        :class="{ 'bottom-line-dashed': lastParents.length > 1 }"
      >
        <h4 v-if="clientParent">{{ clientParent.fullName }}</h4>
        <h4 v-else>Bossnet</h4>
        <small>Votre parent</small>
      </div>

      <div class="children">
        <template v-if="lastParents.length">
          <div class="parent">
            <div class="node bottom-line-dashed">
              <h4>{{ lastParent.fullName }}</h4>
              <small>
                <span class="left-text">{{ lastParent.leftChildsCount }} </span>
                /
                <span class="right-text">{{
                  lastParent.rightChildsCount
                }}</span>
              </small>
            </div>
            <div class="children">
              <div class="parent">
                <button class="btn light" @click="fetchPreviousTree">
                  Voir plus
                </button>
                <div class="children">
                  <client-tree-node
                    :clients="clients"
                    :currentClient="clients[0]"
                    @fetchMore="fetchMore"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <client-tree-node
          v-else
          :clients="clients"
          :currentClient="clients[0]"
          @fetchMore="fetchMore"
        />
      </div>
    </div>
  </div>
</template>

<script>
import API_ROUTES from "../../../apiRoutes";
import { scrollToElement } from "../../../utils/userInteractions";
import SpinnerLoading from "../../../components/utilities/SpinnerLoading.vue";
import ClientTreeNode from "../../../components/client/ClientTreeNode.vue";
export default {
  components: { ClientTreeNode, SpinnerLoading },
  data() {
    return {
      isLoading: true,
      clients: [],
      lastParents: [], // for pagination
    };
  },
  computed: {
    client() {
      return this.$store.state.client;
    },
    clientParent() {
      const { parent } = this.client;
      if (parent)
        return {
          fullName: `${parent.profile.firstName} ${parent.profile.lastName}`,
        };
    },
    lastParent() {
      const lastParent = this.lastParents[this.lastParents.length - 1];
      if (lastParent)
        return {
          fullName: `${lastParent.profile.firstName} ${lastParent.profile.lastName}`,
          leftChildsCount: lastParent.leftChildsCount,
          rightChildsCount: lastParent.rightChildsCount,
        };
    },
  },
  methods: {
    scrollTreeContainerToCenter() {
      const { treeContainer } = this.$refs;
      this.$nextTick(() => {
        const scrollToXCenter =
          treeContainer.scrollWidth / 2 - treeContainer.clientWidth / 2;
        treeContainer.scrollTo(scrollToXCenter, 0);
      });
    },
    scrollToTopContainer() {
      scrollToElement(this.$refs.treeContainer);
    },
    async fetchAndSetClientsTreeByClientId(clientId) {
      this.isLoading = true;
      const response = await this.$api.$get(
        API_ROUTES.getTreeByClientId(clientId)
      );
      this.clients = response.clients;
      this.isLoading = false;
      this.scrollTreeContainerToCenter();
    },
    async fetchPreviousTree() {
      this.scrollToTopContainer();
      // pop last parent and get its id
      const lastParentId = this.lastParents.pop()._id;
      // fetch by last parent
      await this.fetchAndSetClientsTreeByClientId(lastParentId);
    },
    async fetchMore(client) {
      this.scrollToTopContainer();
      // push last tree parent
      this.lastParents.push(this.clients[0]);
      // fetch new tree
      await this.fetchAndSetClientsTreeByClientId(client._id);
    },
  },
  mounted() {
    this.fetchAndSetClientsTreeByClientId(this.client._id);
  },
};
</script>


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
     rounded-lg shadow-md border border-dashed p-4;
    &.bottom-line-dashed::before {
      @apply border-dashed;
    }
  }
  .node::before {
    content: "";
    z-index: -1;
    height: 35px;
    @apply block absolute rounded-full border-l-2
     border-gray-400 top-full;
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

  .parent > button {
    margin-top: 1px;
    @apply font-normal;
    width: max-content;
    &::before {
      content: "";
      z-index: -1;
      height: 35px;
      @apply block absolute rounded-full border-l-2 border-dashed
     border-gray-400 top-full;
    }
  }
}
</style>