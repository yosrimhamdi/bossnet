<template>
  <aside>
    <div class="toggler">
      <button
        :title="showAside ? 'Masquer le menu' : 'Afficher le menu'"
        @click="$emit('toggleAside')"
      >
        <arrow-right-icon :class="{ 'transform rotate-180': showAside }" />
      </button>
    </div>
    <template v-if="showAside">
      <div class="client-info">
        <div class="avatar">
          <span>{{ avatarContent }}</span>
        </div>
        <div class="details">
          <h4 :title="fullName">{{ fullName }}</h4>
          <small :title="client.email">{{ client.email }}</small>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <router-link
              to="/client/tree"
              class="btn flat start md no-sh"
              :class="{ light: $route.path.startsWith('/client/tree') }"
            >
              <tree-icon class="left" />
              <span>Arbre bossnet</span></router-link
            >
          </li>
          <li>
            <router-link
              to="/client/balance"
              class="btn flat start md no-sh"
              :class="{ light: $route.path == '/client/balance' }"
            >
              <pocket-icon class="left" />
              <span>Mon solde</span></router-link
            >
          </li>
          <li>
            <router-link
              to="/client/settings"
              class="btn flat start md no-sh"
              :class="{ light: $route.path.startsWith('/client/settings') }"
            >
              <settings-icon class="left" />
              <span>Paramètres</span></router-link
            >
          </li>
          <li>
            <button
              class="btn flat start md no-sh logout-btn"
              @click="$store.dispatch('logout')"
            >
              <logout-icon class="left" />
              <span>Déconnexion</span>
            </button>
          </li>
        </ul>
      </nav>
    </template>
  </aside>
</template>

<script>
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
import LogoutIcon from "../icons/LogoutIcon.vue";
import PocketIcon from "../icons/PocketIcon.vue";
import SettingsIcon from "../icons/SettingsIcon.vue";
import TreeIcon from "../icons/TreeIcon.vue";
export default {
  components: {
    TreeIcon,
    PocketIcon,
    SettingsIcon,
    LogoutIcon,
    ArrowRightIcon,
  },
  props: {
    showAside: Boolean,
  },
  computed: {
    client() {
      return this.$store.state.client;
    },
    avatarContent() {
      const { firstName, lastName } = this.client.profile;
      return firstName[0] + lastName[0];
    },
    fullName() {
      const { firstName, lastName } = this.client.profile;
      return `${firstName} ${lastName}`;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
aside {
  width: var(--aside-width);
  @apply px-4 py-2 border-r sticky top-0 h-screen;
}
.client-info {
  @apply flex items-center;
  .details {
    width: calc(100% - 80px);
    @apply relative pl-4;
  }
  h4 {
    @apply block text-xl font-semibold overflow-ellipsis overflow-hidden;
  }
  small {
    @apply block text-sm overflow-ellipsis overflow-hidden;
  }
}
.avatar {
  width: 80px;
  height: 80px;
  @apply text-4xl font-extrabold text-primary 
  flex items-center justify-center
  bg-primary-light rounded shadow-sm capitalize;
}
nav {
  @apply mt-14;
  li {
    @apply mb-2;
  }
}
.toggler {
  @apply flex justify-start mb-8;
  button {
    @apply rounded-lg w-12 px-2 bg-white border;
  }
}
</style>
<style lang="scss">
.logout-btn {
  @apply text-red-500;
  svg {
    path {
      stroke: rgb(239, 68, 68);
    }
  }
}
.toggler button {
  svg {
    path {
      stroke: var(--primary-cl);
    }
  }
}
</style>