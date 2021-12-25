<template>
  <div
    @mouseover="mouseIsOver = true"
    @mouseleave="mouseIsOver = false"
    @touchstart="mouseIsOver = true"
    @touchend="mouseIsOver = false"
    class="uil-swiper"
    :class="swiperClassName"
  >
    <div class="act-btn d-l">
      <button
        @click="swipeLeft"
        :disabled="leftBtnDisabled"
        class="btn sq dark"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.4999 23.2398L9.89323 15.6331C8.9949 14.7348 8.9949 13.2648 9.89323 12.3664L17.4999 4.75977"
            stroke="white"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div class="act-btn d-r">
      <button
        @click="swipeRight"
        :disabled="rightBtnDisabled"
        class="btn sq dark"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5001 4.76023L18.1068 12.3669C19.0051 13.2652 19.0051 14.7352 18.1068 15.6336L10.5001 23.2402"
            stroke="white"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div ref="container" class="cnt" @scroll.prevent="handleContainerScroll">
      <slot />
    </div>
  </div>
</template>

<script>
import { userIsWatching } from "./../../utils/userInteractions";

export default {
  props: {
    autoHideBtns: {
      type: Boolean,
      default: false,
    },
    autoSwipeEachSeconds: Number,
    allowScroll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      leftBtnDisabled: true,
      rightBtnDisabled: false,
      mouseIsOver: false,
    };
  },
  computed: {
    swiperClassName() {
      console.log(this.allowScroll);
      return `${this.autoHideBtns ? "a-h-btn" : ""} ${
        this.allowScroll ? "a-sc" : ""
      }`;
    },
  },
  methods: {
    disableAndEnableBtns({ scrollLeft, scrollWidth, clientWidth }) {
      if (scrollWidth == clientWidth || scrollWidth == clientWidth - 1) {
        this.leftBtnDisabled = true;
        this.rightBtnDisabled = true;
      } else if (scrollLeft <= 0) {
        // start
        this.leftBtnDisabled = true;
        this.rightBtnDisabled = false;

        this.autoSwipeToRight = true;
      } else if (scrollLeft + clientWidth >= scrollWidth) {
        // end
        this.leftBtnDisabled = false;
        this.rightBtnDisabled = true;

        this.autoSwipeToRight = false;
      } else {
        // middle
        this.leftBtnDisabled = false;
        this.rightBtnDisabled = false;
      }
    },
    swipeLeft() {
      const { container } = this.$refs,
        { clientWidth, scrollLeft, scrollWidth } = container;
      let newScrollTo = 0;
      // increment newScrollTo by clientWidth until get previous scrollToWidth
      while (newScrollTo < scrollLeft - clientWidth) {
        newScrollTo += clientWidth;
      }
      container.scrollTo(newScrollTo, 0);
      this.disableAndEnableBtns({
        scrollLeft: newScrollTo,
        scrollWidth,
        clientWidth,
      });
    },
    swipeRight() {
      const { container } = this.$refs,
        { clientWidth, scrollLeft, scrollWidth } = container;
      let newScrollTo = 0;
      // increment newScrollTo by clientWidth until get next scrollToWidth
      while (newScrollTo <= scrollLeft) {
        newScrollTo += clientWidth;
      }
      container.scrollTo(newScrollTo, 0);
      this.disableAndEnableBtns({
        scrollLeft: newScrollTo,
        scrollWidth,
        clientWidth,
      });
    },
    // on swipe with finger in (phablet && mobile)
    handleContainerScroll({ target }) {
      this.disableAndEnableBtns(target);
    },
    handleAutoSwipeEachSeconds() {
      if (!(this.leftBtnDisabled && this.rightBtnDisabled)) {
        this.autoSwipeToRight = true;
        this.autoSwiperInterval = setInterval(() => {
          if (!this.mouseIsOver && userIsWatching(this.$el)) {
            this.autoSwipeToRight ? this.swipeRight() : this.swipeLeft();
          }
        }, 1000 * this.autoSwipeEachSeconds);
      }
    },
  },
  mounted() {
    setTimeout(
      () =>
        this.$refs &&
        this.$refs.container &&
        this.disableAndEnableBtns(this.$refs.container),
      3000
    );
    // handle auto swipe if exists
    if (this.autoSwipeEachSeconds) {
      this.handleAutoSwipeEachSeconds();
    }
  },
  beforeDestroy() {
    if (this.autoSwiperInterval) clearInterval(this.autoSwiperInterval);
  },
};
</script>

<style lang="scss" scoped>
.uil-swiper {
  @apply flex relative max-w-full;
  width: 100%;

  &.a-sc {
    // allow scroll
    .cnt {
      // swiper content
      @apply overflow-x-auto;
    }
  }
}

.act-btn {
  // action btn
  @apply absolute z-20 h-full flex items-center p-2;
  &.d-l {
    // direction left ( swipe left btn )
    @apply left-0;
    .uil-icon {
      transform: rotate(180deg);
    }
  }
  &.d-r {
    // direction right ( swipe right btn )
    @apply right-0;
  }
  button:disabled {
    @apply hidden;
  }
}
.a-h-btn {
  // auto hide btns
  .act-btn {
    @apply invisible;
  }
  &:hover .act-btn {
    @apply visible;
  }
}

.cnt {
  // swiper content
  @apply relative max-w-full min-w-full items-center justify-start
   overflow-x-auto inline-flex flex-nowrap;
  scroll-behavior: smooth;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: 0.5px; /* Firefox */
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    @apply rounded;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    @apply rounded;
  }
}

@screen sm {
  .cnt {
    // swiper content
    @apply overflow-x-hidden;
  }
}
</style>