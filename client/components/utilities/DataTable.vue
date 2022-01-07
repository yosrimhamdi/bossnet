<template>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th v-for="(col, i) in cols" :key="i">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    cols: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style lang="scss" >
.data-table {
  @apply mt-6 border rounded-md border-gray-200;
  & > table {
    @apply table-auto bg-white w-full rounded-md shadow-sm;

    thead > tr > th {
      @apply px-4 py-6 text-left text-sm font-semibold bg-gray-50;
    }

    thead {
      @apply border-b-2;
    }
    thead > tr,
    tbody > tr {
      @apply border-b;
      &:last-child {
        @apply border-0;
      }
    }
  }
}
</style>