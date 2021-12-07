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
        class="btn sq primary"
      >
        <svg
          class="uil-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div class="act-btn d-r">
      <button
        @click="swipeRight"
        :disabled="rightBtnDisabled"
        class="btn sq primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
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
      return `${this.autoHideBtns ? "a-h-btn" : ""}`;
    },
  },
  methods: {
    disableAndEnableBtns({ scrollLeft, scrollWidth, clientWidth }) {
      if (scrollLeft <= 0) {
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
    // set initial right btn state
    const { clientWidth, scrollWidth } = this.$refs.container;
    if (clientWidth === scrollWidth) this.rightBtnDisabled = true;
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
  @apply relative;
}

.act-btn {
  // action btn
  @apply absolute z-20 h-full flex items-center;
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
  @apply relative overflow-x-auto flex flex-nowrap py-2;
  scroll-behavior: smooth;
}
@screen sm {
  .cnt {
    // swiper content
    @apply overflow-x-hidden;
  }
}
</style>