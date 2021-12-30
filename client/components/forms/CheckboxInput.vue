<template>
  <div class="checkbox-input">
    <button type="button">
      <svg
        v-if="value"
        @click="$emit('input', false)"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5 2C3.34315 2 2 3.34315 2 5V15C2 16.6569 3.34315 18 5 18H15C16.6569 18 18 16.6569 18 15V5C18 3.34315 16.6569 2 15 2H5ZM14.6358 7.98694C14.9876 7.63576 14.9881 7.06591 14.6369 6.71414C14.2857 6.36238 13.7159 6.36191 13.3641 6.71309L8.69116 11.3783L6.63584 9.32637C6.28408 8.97519 5.71423 8.97566 5.36305 9.32743C5.01187 9.67919 5.01234 10.249 5.36411 10.6002L8.0553 13.2869C8.40665 13.6377 8.97568 13.6377 9.32703 13.2869L14.6358 7.98694Z"
          fill="#FFBA00"
        />
      </svg>
      <svg
        v-else
        @click="$emit('input', true)"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2.5"
          y="2.5"
          width="15"
          height="15"
          rx="2.5"
          stroke="#FFBA00"
        />
      </svg>
    </button>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
};
</script>
