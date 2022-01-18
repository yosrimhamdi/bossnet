<template>
  <tr>
    <td class="amount">{{ payment.amount.toLocaleString() }} TND</td>
    <template v-if="taxAmount">
      <td>{{ amountWithTax.toLocaleString() }} TND</td>
      <td>
        {{ taxAmount.toLocaleString() }} TND |<span
          title="Taxe de 15% si montant supérieur ou égal à 1 million."
          class="tax-percent"
          >-15%</span
        >
      </td>
    </template>
    <template v-else>
      <td>---</td>
      <td>---</td>
    </template>
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
const AMOUNT_TAX_PERCENT = 0.15; // 15% if (amount > 1000TND)
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
    taxAmount() {
      const { amount } = this.payment;
      if (amount >= 1000) {
        return amount * AMOUNT_TAX_PERCENT;
      }
    },
    amountWithTax() {
      const { amount } = this.payment;
      if (amount >= 1000) {
        return amount * (1 - AMOUNT_TAX_PERCENT);
      }
      return amount;
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
.tax-percent {
  @apply text-red-500 ml-1 font-semibold;
}
.amount {
  @apply text-green-600 font-semibold;
}
</style>