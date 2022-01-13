<template>
  <div class="parent">
    <div class="node" :class="{ 'red-border': !currentClient.isVerified }">
      <h4>{{ fullName }}</h4>
      <small>
        <span class="left-text">{{ currentClient.leftChildsCount }}</span>
        /
        <span class="right-text">{{ currentClient.rightChildsCount }}</span>
      </small>
      <div class="bottom">
        {{ treeHeightPosition }}
      </div>
      <client-actions-modal class="top-right" :client="currentClient" />
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
import ClientActionsModal from "./ClientActionsModal.vue";
import ClientTreeNode from "./ClientTreeNode";
export default {
  name: "client-tree-node",
  components: {
    ClientTreeNode,
    Modal,
    DotsMenuIcon,
    ClientActionsModal,
  },
  props: {
    clients: Array,
    currentClient: Object,
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
    treeHeightPosition() {
      const { parent } = this.$store.state.client;
      if (parent) {
        return this.currentClient.ancestorsSize - parent.ancestorsSize - 1;
      }
      return this.currentClient.ancestorsSize;
    },
  },
  methods: {
    fetchMore(client) {
      this.$emit("fetchMore", client);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>