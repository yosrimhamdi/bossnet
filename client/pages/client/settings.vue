<template>
  <section class="settings">
    <tabs-nav :tabs="navTabs" />
    <nuxt-child />
  </section>
</template>

<script>
import TabsNav from "../../components/utilities/TabsNav.vue";
import { scrollToElement } from "../../utils/userInteractions";
export default {
  head() {
    return {
      titleTemplate: `Espace client - Paramètres | %s`,
    };
  },
  components: { TabsNav },
  computed: {
    navTabs() {
      return [
        {
          title: "Information personnelles",
          path: "/client/settings",
        },
        { title: "Mot de passe", path: "/client/settings/update-password" },
      ];
    },
  },
  mounted() {
    scrollToElement(document.scrollingElement);
  },
};
</script>
<style lang="scss">
.settings h1 {
  @apply text-3xl font-bold mb-8 mt-4 pb-4 border-b;
  @screen md {
    @apply text-4xl;
  }
}
</style>