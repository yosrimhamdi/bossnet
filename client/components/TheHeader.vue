<template>
  <transition name="fade-down">
    <header
      v-show="showHeader"
      :class="{
        'has-shadow': !scrollPositionIsTop,
      }"
    >
      <div class="start-side">
        <button
          id="toggle-nav-btn"
          @click="showCenterSideByBtn = !showCenterSideByBtn"
          class="btn sq light"
        >
          <menu-icon />
        </button>
        <logo class="sm" />
      </div>

      <transition name="fade">
        <div v-show="showNav" class="center-side">
          <partners-search />
          <nav>
            <ul>
              <li>
                <dropdown direction="lb">
                  <template #toggler="{ open }">
                    <button class="header-link">
                      Partenaires
                      <arrow-small-bottom-icon
                        :class="{ 'transform rotate-180': open }"
                      />
                    </button>
                  </template>
                  <template #content>
                    <div class="dropdown-content">
                      <div>
                        <router-link to="/categories" class="drop-btn"
                          >Catégories</router-link
                        >
                      </div>
                      <hr />
                      <div>
                        <button class="drop-btn">Chaneb food</button>
                        <button class="drop-btn">Monoprix</button>
                        <button class="drop-btn">Carrefour</button>
                      </div>
                      <hr />
                      <div class="px-2">
                        <router-link to="/partners" class="btn flat light">
                          Voir tous
                          <arrow-right-icon class="transform -rotate-45" />
                        </router-link>
                      </div>
                    </div>
                  </template>
                </dropdown>
              </li>
              <li>
                <router-link to="/about" class="header-link"
                  >À propos</router-link
                >
              </li>
              <li>
                <router-link to="/contact" class="header-link"
                  >Contact</router-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </transition>
      <div class="end-side">
        <router-link to="/signin" class="btn primary md">
          Mon compte <account-arrow-right-icon />
        </router-link>
      </div>
    </header>
  </transition>
</template>

<script>
import SearchInput from "./forms/SearchInput.vue";
import PartnersSearch from "./header/PartnersSearch.vue";
import AccountArrowRightIcon from "./icons/AccountArrowRightIcon.vue";
import ArrowRightIcon from "./icons/ArrowRightIcon.vue";
import ArrowSmallBottomIcon from "./icons/ArrowSmallBottomIcon.vue";
import MenuIcon from "./icons/MenuIcon.vue";
import Logo from "./Logo.vue";
import Dropdown from "./utilities/Dropdown.vue";

const LARGE_SCREEN_MIN_WIDTH = 1280; // px
const NO_HIDING_MAX_Y = 300; // px

export default {
  data() {
    return {
      scrollPositionIsTop: true,
      showCenterSideByBtn: false,
      showHeader: true,
      isSmallScreen:
        process.client && window.innerWidth < LARGE_SCREEN_MIN_WIDTH,
    };
  },
  computed: {
    showNav() {
      return (
        !this.isSmallScreen ||
        this.showCenterSideByBtn ||
        this.scrollPositionIsTop
      );
    },
  },
  methods: {
    updateHasBorderOnScroll() {
      this.scrollPositionIsTop = document.scrollingElement.scrollTop < 30;
      if (!this.scrollPositionIsTop) {
        this.showCenterSideByBtn = false;
      }
    },
    updateShowHeaderOnScroll() {
      const previousScroll = this.previousScroll || 0;
      if (window.scrollY > NO_HIDING_MAX_Y) {
        if (previousScroll < window.scrollY - 20) {
          this.showHeader = false;
        } else if (previousScroll > window.scrollY + 20) {
          this.showHeader = true;
        }
        // this.showHeader = previousScroll > window.scrollY;
      } else {
        this.showHeader = true;
      }
      this.previousScroll = window.scrollY;
    },
    setIsSmallScreen() {
      this.isSmallScreen = window.innerWidth < LARGE_SCREEN_MIN_WIDTH;
    },
  },
  mounted() {
    document.addEventListener("scroll", this.updateHasBorderOnScroll);
    document.addEventListener("scroll", this.updateShowHeaderOnScroll);
    window.addEventListener("resize", this.setIsSmallScreen);
  },
  components: {
    Logo,
    SearchInput,
    AccountArrowRightIcon,
    Dropdown,
    ArrowSmallBottomIcon,
    ArrowRightIcon,
    MenuIcon,
    PartnersSearch,
  },
};
</script>

<style lang="scss" scoped>
header {
  @apply fixed z-40 bg-white top-0 w-full
  flex items-center justify-between 
   py-2 px-2 border-b;
  @screen lg {
    @apply px-4;
  }
  @screen xl {
    @apply justify-center;
  }
  &.has-shadow {
    @apply shadow-sm;
    .center-side {
      @screen xl {
        @apply border-none shadow-none;
      }
      @apply shadow-md;
    }
  }
}

.start-side {
  @apply flex items-center;
  @screen xl {
    @apply w-1/6;
  }
  button {
    @apply mr-4;
  }
}
.end-side {
  @apply flex items-center justify-end;
  @screen xl {
    @apply w-1/6;
  }
}
.center-side {
  @screen xl {
    @apply relative w-4/6 p-0 m-4;
  }
  @screen lg {
    @apply justify-center shadow-none border-none;
  }
  @apply absolute left-0 top-full p-4
  flex items-center justify-start flex-wrap w-full
  bg-white  border-b;
}
.header-search-input {
  @screen lg {
    @apply w-3/5;
  }
  @apply w-full;
}
nav {
  @screen lg {
    @apply w-2/5;
  }
  @apply w-full;
}

ul {
  @screen lg {
    @apply justify-start items-center ml-4 mt-0;
  }
  @apply flex items-start justify-start flex-wrap w-full mt-8;
}
li {
  @screen lg {
    @apply my-0;
  }
  @apply mx-3 my-2 block;
  a.nuxt-link-active {
    @apply text-primary font-semibold;
  }
}
.header-link {
  @apply flex items-center;
  svg {
    @apply ml-2;
  }
}

#toggle-nav-btn {
  @screen xl {
    @apply hidden;
  }
}
</style>