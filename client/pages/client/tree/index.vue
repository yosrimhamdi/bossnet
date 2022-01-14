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
              <h4>
                {{ lastParent.profile.firstName }}
                {{ lastParent.profile.lastName }}
              </h4>
              <small>
                <span class="left-text">{{ lastParent.leftChildsCount }} </span>
                /
                <span class="right-text">{{
                  lastParent.rightChildsCount
                }}</span>
              </small>
              <div class="bottom">
                {{ lastParentTreeHeightPosition }}
              </div>
              <client-actions-modal class="top-right" :client="lastParent" />
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
import ClientActionsModal from "../../../components/client/ClientActionsModal.vue";
export default {
  components: { ClientTreeNode, SpinnerLoading, ClientActionsModal },
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
      return this.lastParents[this.lastParents.length - 1];
    },
    lastParentTreeHeightPosition() {
      const { parent } = this.$store.state.client;
      if (parent) {
        return this.lastParent.ancestorsSize - parent.ancestorsSize - 1;
      }
      return this.lastParent.ancestorsSize;
    },
  },
  methods: {
    scrollTreeContainerToCenter() {
      const { treeContainer } = this.$refs;
      this.$nextTick(() => {
        if (treeContainer) {
          const scrollToXCenter =
            treeContainer.scrollWidth / 2 - treeContainer.clientWidth / 2;
          treeContainer.scrollTo(scrollToXCenter, 0);
        }
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
    --node-height: 112px;
    --node-width: 160px;
    height: var(--node-height);
    width: var(--node-width);
    @apply relative bg-white flex flex-col
   items-center justify-center text-center
     rounded-lg shadow border border-dashed p-4;
    &.bottom-line-dashed::before {
      @apply border-dashed;
    }
    &.red-border {
      @apply border-red-500;
    }
    h4 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;

      @apply font-semibold max-w-full break-words;
    }
    small {
      @apply font-semibold mt-2;
      .left-text {
        @apply text-blue-500;
      }
      .right-text {
        @apply text-green-600;
      }
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
  .top-right {
    @apply absolute top-0 right-0;
  }
  .bottom {
    height: 25px;
    min-width: 25px;
    bottom: -12.5px;
    @apply absolute text-xs font-semibold 
    rounded-full bg-white border text-primary
    flex items-center justify-center;
  }
}
</style>