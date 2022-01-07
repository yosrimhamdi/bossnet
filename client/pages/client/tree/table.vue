<template>
  <div ref="treeTableContainer" class="tree-table-container">
    <spinner-loading v-if="isLoading" class="lg primary center" />
    <template v-else>
      <data-table :cols="tableCols">
        <client-tree-table-row
          v-for="client in clients.docs"
          :key="client._id"
          :client="client"
        />
      </data-table>
      <paginator :currentPage="clients.page" :totalPages="clients.totalPages" />
    </template>
  </div>
</template>

<script>
import API_ROUTES from "../../../apiRoutes";
import { scrollToElement } from "../../../utils/userInteractions";
import DataTable from "../../../components/utilities/DataTable.vue";
import Paginator from "../../../components/utilities/Paginator.vue";
import SpinnerLoading from "../../../components/utilities/SpinnerLoading.vue";
import ClientTreeTableRow from "../../../components/client/ClientTreeTableRow.vue";

export default {
  components: { DataTable, Paginator, ClientTreeTableRow, SpinnerLoading },
  data() {
    return {
      clients: {
        docs: [],
        totalDocs: 0,
        page: 0,
        totalPages: 0,
      },
      isLoading: true,
    };
  },
  computed: {
    tableCols() {
      return ["Client", "E-mail", "Fils gauche", "Fils droit", "Actions"];
    },
  },
  methods: {
    async fetchAuthClientChildren() {
      this.isLoading = true;
      this.scrollToTableContainer();
      const page = this.$route.query.page || 1;
      const response = await this.$api.$get(
        API_ROUTES.getAuthClientChildren(page)
      );
      this.clients = response.clients;
      this.isLoading = false;
    },
    scrollToTableContainer() {
      scrollToElement(this.$refs.treeTableContainer);
    },
  },
  mounted() {
    this.fetchAuthClientChildren();
  },
  watch: {
    "$route.query.page"() {
      this.fetchAuthClientChildren();
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-table-container {
  @apply block max-w-full overflow-x-auto;
}
</style>