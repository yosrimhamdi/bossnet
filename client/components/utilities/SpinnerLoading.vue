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
.md {
  &::after {
    @apply block w-10 h-10 border-2 my-2;
  }
}
.lg {
  &::after {
    @apply block w-24 h-24  border-4;
  }
  &.center {
    @apply h-64;
  }
}
.primary {
  &::after {
    @apply border-primary;
  }
}
.center {
  @apply w-full flex items-center justify-center;
}
</style>