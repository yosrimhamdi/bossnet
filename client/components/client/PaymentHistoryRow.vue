<template>
  <tr>
    <td>{{ payment.amount.toLocaleString() }} TND</td>
    <td>{{ formatedPaymentMethod }}</td>
    <td v-if="payment.paidDate">{{ formatedPaidDate }}</td>
    <td v-else>---</td>
  </tr>
</template>

<script>
const PAYMENT_METHODS = {
  ca: "Espèces",
  ch: "Chèque",
  d: "Brouillon",
  t: "Transfert",
};
export default {
  props: {
    payment: Object,
  },
  computed: {
    formatedPaymentMethod() {
      return PAYMENT_METHODS[this.payment.paymentMethod];
    },
    formatedPaidDate() {
      if (this.payment.paidDate)
        return new Date(this.payment.paidDate).toLocaleDateString();
    },
  },
};
</script>

<style lang="scss" scoped>
td {
  @apply px-4 py-6 text-left font-normal;
  @apply text-sm select-text;

  min-width: 160px;
}
</style>