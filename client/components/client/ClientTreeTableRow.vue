<template>
  <tr :class="{ 'red-border': !client.isVerified }">
    <td>{{ fullName }}</td>
    <td>{{ client.email }}</td>
    <td class="left-text">{{ client.leftChildsCount }}</td>
    <td class="right-text">{{ client.rightChildsCount }}</td>
    <td>
      <client-actions-modal class="table-actions" :client="client" />
    </td>
  </tr>
</template>

<script>
import Dropdown from "../utilities/Dropdown.vue";
import ClientActionsModal from "./ClientActionsModal.vue";

export default {
  components: {
    Dropdown,
    ClientActionsModal,
  },
  props: {
    client: Object,
  },
  computed: {
    fullName() {
      const { firstName, lastName } = this.client.profile;
      return `${firstName} ${lastName}`;
    },
  },
};
</script>

<style lang="scss" scoped>
tr {
  &.red-border {
    @apply border-l;
    border-left-color: rgb(239, 68, 68);
  }
  td {
    @apply px-4 py-6 text-left font-normal;
    @apply text-sm select-text;

    min-width: 100px;
  }
  td:nth-child(1) {
    @apply capitalize;
  }
  td:last-child {
    @apply min-w-max;
  }
  .left-text,
  .right-text {
    @apply font-semibold;
  }
  .left-text {
    @apply text-blue-500;
  }
  .right-text {
    @apply text-green-600;
  }
  .actions-btn {
    @apply rounded shadow-sm border p-2;
    svg {
      @apply w-5 h-5;
    }
  }
  .dropdown-content {
    @apply w-64;
  }
}
</style>
<style lang="scss">
.table-actions .toggle-btn {
  @apply p-2 rounded border shadow-sm;
}
</style>