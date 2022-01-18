<template>
  <transition name="fade-down">
    <div class="offline-status" v-if="$nuxt.isOffline">
      <div>
        <offline-icon />
        <div class="info">
          <p>
            Vous êtes actuellement hors ligne, veuillez vérifier votre
            connexion.
          </p>
          <button @click="refresh" class="btn light">Actualiser</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import OfflineIcon from "./icons/OfflineIcon.vue";
export default {
  components: { OfflineIcon },
  methods: {
    refresh() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.offline-status {
  @apply fixed bottom-0 right-0 p-4 w-full flex justify-end z-50;
}
.offline-status > div {
  @apply w-full
  bg-white  rounded border shadow-md p-4
  flex items-start;
  @screen md {
    width: 400px;
  }
}
.info {
  @apply pl-4 border-l border-dashed;
  width: calc(100% - 50px);
}
p {
  @apply mb-2;
}
</style>
<style lang="scss">
.offline-status svg {
  @apply pr-4;
  width: 50px;
  height: 50px;

  path {
    fill: var(--primary-cl);
  }
}
</style>