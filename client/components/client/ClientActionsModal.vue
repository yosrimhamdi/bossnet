<template>
  <modal>
    <template #toggler>
      <button class="toggle-btn">
        <dots-menu-icon />
      </button>
    </template>
    <template #content>
      <div class="modal-content">
        <div class="info">
          <div class="left-side">
            <div class="mb-2">
              <h3>{{ fullName }}</h3>
              <p>{{ client.email }}</p>
            </div>
            <p><strong>ID:</strong> {{ client._id }}</p>
            <!-- <small></small> -->
          </div>
          <div class="right-side">
            <small>
              <span title="Fils gauche" class="left-count">{{
                client.leftChildsCount
              }}</span>
              /
              <span title="Fils droit" class="right-count">{{
                client.rightChildsCount
              }}</span>
            </small>
          </div>
        </div>
        <a
          v-if="client.profile.facebookAccountLink"
          :href="'https://' + client.profile.facebookAccountLink"
          target="blank"
          class="action"
          >Facebook de {{ fullName }}</a
        >
        <template v-if="hasEmptyChild && client.isVerified">
          <button class="action" @click="copySignUpLink">
            <span v-if="linkIsCopied">Le lien est copié!</span>
            <span v-else>Copier le lien d’inscription</span>
          </button>
          <button class="action" @click="copyClientId">
            <span v-if="idIsCopied">L'identifiant est copié!</span>
            <span v-else>Copier l’identifiant</span>
          </button>
        </template>
      </div></template
    >
  </modal>
</template>

<script>
import DotsMenuIcon from "../icons/DotsMenuIcon.vue";
import Modal from "../utilities/Modal.vue";
export default {
  components: { Modal, DotsMenuIcon },
  data() {
    return {
      idIsCopied: false,
      linkIsCopied: false,
    };
  },
  props: {
    client: Object,
  },
  computed: {
    fullName() {
      const { firstName, lastName } = this.client.profile;
      return `${firstName} ${lastName}`;
    },
    hasEmptyChild() {
      return (
        this.client.leftChildsCount == 0 || this.client.rightChildsCount == 0
      );
    },
  },
  methods: {
    copyClientId() {
      navigator.clipboard.writeText(this.client._id);
      this.idIsCopied = true;
      setTimeout(() => (this.idIsCopied = false), 4000);
    },
    copySignUpLink() {
      const signUpLink = `${window.location.host}/signup?parentId=${this.client._id}`;
      navigator.clipboard.writeText(signUpLink);
      this.linkIsCopied = true;
      setTimeout(() => (this.linkIsCopied = false), 4000);
    },
  },
};
</script>
<style lang="scss" scoped>
.toggle-btn {
  @apply block p-2;
  svg {
    @apply w-5 h-5;
  }
}
.modal-content {
  width: 480px;
  max-width: 100%;
  @apply rounded-md border border-gray-50 shadow-md 
  bg-white p-8 z-20 text-left;
}
.info {
  @apply border-b border-dashed pb-4
    flex items-center flex-wrap mb-2;
  .left-side {
    @apply w-full;
    @screen md {
      @apply w-2/3;
    }
  }
  .right-side {
    @apply p-2 w-full border-l cursor-default mt-2;
    @screen md {
      @apply w-1/3 text-center mt-0;
    }
    small {
      @apply text-xl;
    }
  }
  p {
    @apply text-sm;
  }
  & > * {
    @apply block;
  }
}
h3 {
  @apply text-2xl font-bold;
}
.action {
  @apply block w-full border-b py-3 px-2 text-sm font-semibold text-left;
  &:hover {
    @apply text-primary;
  }
  &:last-child {
    @apply border-b-0;
  }
}
a.action {
  @apply hover:underline;
}
.left-count {
  @apply text-blue-500 font-semibold;
}
.right-count {
  @apply text-green-600 font-semibold;
}
</style>