<template>
  <span class="spinner"></span>
</template>
<style lang="scss" scoped>
.spinner {
  &::after {
    @apply relative block rounded-full;
    border-top-color: transparent !important;
    content: "";
    animation: spin 1s linear infinite;
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>
<style lang="scss">
.lg {
  &::after {
    @apply block w-24 h-24  border-4;
  }
}
.primary {
  &::after {
    @apply border-primary;
  }
}
.center {
  @apply w-full flex items-center justify-center h-96;
}
</style>