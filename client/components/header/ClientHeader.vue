<template>
  <dropdown v-if="client">
    <template #toggler="{ open }">
      <button class="btn primary md">
        Mon compte
        <arrow-small-bottom-icon :class="{ 'transform rotate-180': open }" />
      </button>
    </template>
    <template #content>
      <div class="dropdown-content">
        <div class="info">
          <p class="mb-2">
            Bonjour,<span class="capitalize">
              {{ client.profile.firstName }}</span
            >
          </p>
          <small :title="client.email">{{ client.email }}</small>
        </div>
        <router-link to="/client/tree" class="drop-btn">
          <tree-icon />
          <span>Mon arbre</span></router-link
        >
        <router-link to="/client/balance" class="drop-btn">
          <pocket-icon />
          <span>Mon solde</span></router-link
        >
        <router-link to="/client/credit-card" class="drop-btn">
          <credit-card-icon />
          <span>Ma carte</span></router-link
        >
        <hr />
        <router-link to="/client/settings" class="drop-btn">
          <settings-icon />
          Paramètres</router-link
        >
        <button
          @click="$store.dispatch('logout')"
          class="drop-btn text-red-600"
        >
          <logout-icon />
          Déconnexion
        </button>
      </div></template
    >
  </dropdown>
  <router-link v-else to="/signin" class="btn primary md">
    Se connecter
    <account-arrow-right-icon />
  </router-link>
</template>

<script>
import AccountArrowRightIcon from "../icons/AccountArrowRightIcon.vue";
import ArrowSmallBottomIcon from "../icons/ArrowSmallBottomIcon.vue";
import Dropdown from "../utilities/Dropdown.vue";
import TreeIcon from "../icons/TreeIcon.vue";
import PocketIcon from "../icons/PocketIcon.vue";
import SettingsIcon from "../icons/SettingsIcon.vue";
import LogoutIcon from "../icons/LogoutIcon.vue";
import CreditCardIcon from "../icons/CreditCardIcon.vue";
export default {
  components: {
    AccountArrowRightIcon,
    Dropdown,
    ArrowSmallBottomIcon,
    TreeIcon,
    PocketIcon,
    SettingsIcon,
    LogoutIcon,
    CreditCardIcon,
  },
  computed: {
    client() {
      return this.$store.state.client;
    },
  },
};
</script>

<style>
</style>