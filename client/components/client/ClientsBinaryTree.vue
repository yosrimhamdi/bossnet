<template>
  <div class="parent">
    <div class="node">
      <h4>{{ fullName }}</h4>
      <small>
        <span class="left-text">{{ currentClient.leftChildsCount }} </span>
        /
        <span class="right-text">{{ currentClient.rightChildsCount }}</span>
      </small>
    </div>
    <div class="children">
      <div class="left">
        <clients-binary-tree
          v-if="leftChild"
          :currentClient="leftChild"
          :arrayTree="arrayTree"
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
        <clients-binary-tree
          v-if="rightChild"
          :currentClient="rightChild"
          :arrayTree="arrayTree"
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
import ClientsBinaryTree from "./ClientsBinaryTree";
export default {
  name: "clients-binary-tree",
  components: {
    ClientsBinaryTree,
  },
  props: {
    currentClient: Object,
  },
  computed: {
    clientTree() {
      return this.$store.state.clientTree;
    },
    arrayTree() {
      return this.clientTree.clients;
    },
    leftChild() {
      return this.arrayTree.find(
        ({ direction, parent }) =>
          parent == this.currentClient._id && direction == "l"
      );
    },
    rightChild() {
      return this.arrayTree.find(
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
  },
  methods: {
    fetchMore(client) {
      // push last tree parent
      this.$store.commit("setClientTree", {
        lastParents: [
          ...this.clientTree.lastParents,
          this.clientTree.clients[0],
        ],
      });
      // fetch new tree
      this.$store.dispatch("fetchClientTree", client._id);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>