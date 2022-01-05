<template>
  <div class="parent">
    <div class="node">
      <h4>{{ fullName }}</h4>
      <small>
        <span class="left-text">{{ currentClient.leftChildsCount }}</span>
        /
        <span class="right-text">{{ currentClient.rightChildsCount }}</span>
      </small>
      <modal class="top-right">
        <template #toggler>
          <button class="toggle-btn">
            <dots-menu-icon />
          </button>
        </template>
        <template #content>
          <div class="modal-content">
            <div class="info">
              <div class="left-side">
                <div class="mb-2">
                  <h3>{{ fullName }}</h3>
                  <p>{{ currentClient.email }}</p>
                </div>
                <p><strong>ID:</strong> {{ currentClient._id }}</p>
              </div>
              <div class="right-side">
                <small>
                  <span title="Fils gauche" class="left-text">{{
                    currentClient.leftChildsCount
                  }}</span>
                  /
                  <span title="Fils droit" class="right-text">{{
                    currentClient.rightChildsCount
                  }}</span>
                </small>
              </div>
            </div>
            <a
              v-if="currentClient.profile.facebookAccountLink"
              :href="'https://' + currentClient.profile.facebookAccountLink"
              target="blank"
              class="action"
              >Facebook de {{ fullName }}</a
            >
            <template v-if="!hasLeftChilds || !hasRightChilds">
              <button class="action" @click="copySignUpLink">
                <span v-if="linkIsCopied">Le lien est copié!</span>
                <span v-else>Copier le lien d’inscription</span>
              </button>
              <button class="action" @click="copyClientId">
                <span v-if="idIsCopied">L'identifiant est copié!</span>
                <span v-else>Copier l’identifiant</span>
              </button>
            </template>
          </div></template
        >
      </modal>
    </div>
    <div class="children">
      <div class="left">
        <client-tree-node
          v-if="leftChild"
          :clients="clients"
          :currentClient="leftChild"
          @fetchMore="fetchMore"
        />
        <button
          v-else-if="hasLeftChilds"
          class="btn light"
          @click="fetchMore(currentClient)"
        >
          Voir plus
        </button>
        <button v-else class="btn danger">Fin</button>
      </div>
      <div class="right">
        <client-tree-node
          v-if="rightChild"
          :clients="clients"
          :currentClient="rightChild"
          @fetchMore="fetchMore"
        />
        <button
          v-else-if="hasRightChilds"
          class="btn light"
          @click="fetchMore(currentClient)"
        >
          Voir plus
        </button>
        <button v-else class="btn danger">Fin</button>
      </div>
    </div>
  </div>
</template>

<script>
import DotsMenuIcon from "../icons/DotsMenuIcon.vue";
import Modal from "../utilities/Modal.vue";
import ClientTreeNode from "./ClientTreeNode";
export default {
  name: "client-tree-node",
  components: {
    ClientTreeNode,
    Modal,
    DotsMenuIcon,
  },
  props: {
    clients: Array,
    currentClient: Object,
  },
  data() {
    return {
      idIsCopied: false,
      linkIsCopied: false,
    };
  },
  computed: {
    leftChild() {
      return this.clients.find(
        ({ direction, parent }) =>
          parent == this.currentClient._id && direction == "l"
      );
    },
    rightChild() {
      return this.clients.find(
        ({ direction, parent }) =>
          parent == this.currentClient._id && direction == "r"
      );
    },
    fullName() {
      console.log(this.currentClient);
      return (
        this.currentClient.profile.firstName +
        " " +
        this.currentClient.profile.lastName
      );
    },
    hasLeftChilds() {
      return this.currentClient.leftChildsCount > 0;
    },
    hasRightChilds() {
      return this.currentClient.rightChildsCount > 0;
    },
  },
  methods: {
    fetchMore(client) {
      this.$emit("fetchMore", client);
    },
    copyClientId() {
      navigator.clipboard.writeText(this.currentClient._id);
      this.idIsCopied = true;
      setTimeout(() => (this.idIsCopied = false), 4000);
    },
    copySignUpLink() {
      const signUpLink = `${window.location.host}/signup?parentId=${this.currentClient._id}`;
      navigator.clipboard.writeText(signUpLink);
      this.linkIsCopied = true;
      setTimeout(() => (this.linkIsCopied = false), 4000);
    },
  },
};
</script>
<style lang="scss" scoped>
.top-right {
  @apply absolute top-0 right-0;
}
.toggle-btn {
  @apply block p-2;
  svg {
    @apply w-5 h-5;
  }
}
.modal-content {
  width: 480px;
  max-width: 100%;
  @apply rounded-md border border-gray-50 shadow-md 
  bg-white p-8 z-20 text-left;
  .info {
    @apply border-b border-dashed pb-4
    flex items-center flex-wrap mb-2;
    .left-side {
      @apply w-full;
      @screen md {
        @apply w-2/3;
      }
    }
    .right-side {
      @apply p-2 w-full border-l cursor-default;
      @screen md {
        @apply w-1/3 text-center;
      }
      small {
        @apply text-xl;
      }
    }
    p {
      @apply text-sm;
    }
    & > * {
      @apply block;
    }
  }
  h3 {
    @apply text-2xl font-bold;
  }
  .action {
    @apply block w-full border-b py-3 px-2 text-sm font-semibold text-left;
    &:hover {
      @apply text-primary;
    }
    &:last-child {
      @apply border-b-0;
    }
  }
  a.action {
    @apply hover:underline;
  }
}
</style>