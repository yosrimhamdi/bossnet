<template>
  <aside>
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
            :class="{ primary: $route.path == '/client/tree' }"
          >
            <tree-icon class="left" />
            <span>Arbre bossnet</span></router-link
          >
        </li>
        <li>
          <router-link
            to="/client/payments"
            class="btn flat start md no-sh"
            :class="{ primary: $route.path == '/client/payments' }"
          >
            <pocket-icon class="left" />
            <span>Mon solde</span></router-link
          >
        </li>
        <li>
          <router-link
            to="/client/settings"
            class="btn flat start md no-sh"
            :class="{ primary: $route.path == '/client/settings' }"
          >
            <settings-icon class="left" />
            <span>Paramètres</span></router-link
          >
        </li>
        <li>
          <button class="btn flat start md no-sh logout-btn" @click="logout">
            <logout-icon class="left" />
            <span>Déconnexion</span>
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import LogoutIcon from "../icons/LogoutIcon.vue";
import PocketIcon from "../icons/PocketIcon.vue";
import SettingsIcon from "../icons/SettingsIcon.vue";
import TreeIcon from "../icons/TreeIcon.vue";
export default {
  components: { TreeIcon, PocketIcon, SettingsIcon, LogoutIcon },
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
  methods: {
    async logout() {
      this.$router.push("/");
      await this.$auth.logout();
      this.$store.commit("setClient", null);
    },
  },
};
</script>

<style lang="scss" scoped>
aside {
  width: var(--aside-width);
  @apply p-4 border-r sticky top-0 h-screen;
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
  bg-primary-light rounded shadow-sm;
}
nav {
  @apply mt-14;
  li {
    @apply mb-2;
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
</style>