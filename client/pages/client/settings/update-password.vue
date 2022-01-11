<template>
  <section class="update-password-form">
    <form method="post" @submit.prevent="handleSubmit">
      <h1>Modifier votre mot de passe</h1>

      <text-input
        :class="{ 'has-err': $v.currentPassword.$error && submited }"
        v-model.trim="$v.currentPassword.$model"
        type="password"
        label="Mot de passe actuel"
        name="currentPassword"
        placeholder="************"
      >
        <template v-if="$v.currentPassword.$error">
          <small class="err" v-if="!$v.currentPassword.required"
            >Ce champ est requis</small
          >
          <small class="err" v-if="!$v.currentPassword.validFormat"
            >Ce champ doit contenir entre 8 et 128 caractères sans
            espaces.</small
          >
        </template>
      </text-input>
      <div class="input-group">
        <text-input
          :class="{ 'has-err': $v.newPassword.$error && submited }"
          v-model.trim="$v.newPassword.$model"
          type="password"
          label="Nouveau mot de passe"
          name="newPassword"
          placeholder="************"
        >
          <template v-if="$v.newPassword.$error">
            <small class="err" v-if="!$v.newPassword.required"
              >Ce champ est requis</small
            >
            <small class="err" v-if="!$v.newPassword.validFormat"
              >Ce champ doit contenir entre 8 et 128 caractères sans
              espaces.</small
            >
            <small class="err" v-if="!$v.newPassword.isNotEqualToOld"
              >Le nouveau mot de passe doit être différent du mot de passe
              actuel.</small
            >
          </template>
        </text-input>
        <text-input
          :class="{ 'has-err': $v.confirmation.$error && submited }"
          v-model.trim="$v.confirmation.$model"
          type="password"
          label="Confirmation"
          name="confirmation"
          placeholder="************"
        >
          <template v-if="$v.confirmation.$error">
            <small class="err" v-if="!$v.confirmation.required"
              >Ce champ est requis</small
            >

            <small class="err" v-if="!$v.confirmation.isEqual"
              >Le mot de passe de confirmation ne correspond pas au mot de passe
              saisi.</small
            >
          </template>
        </text-input>
      </div>
      <button
        :disabled="isLoading"
        type="submit"
        class="btn primary lg flat mt-12"
      >
        <spinner-loading v-if="isLoading" />
        <span v-else> Sauvegarder </span>
      </button>
    </form>
  </section>
</template>

<script>
import TextInput from "../../../components/forms/TextInput.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { validatePassword } from "../../../utils/formsValidators";
import SpinnerLoading from "../../../components/utilities/SpinnerLoading.vue";
import API_ROUTES from "../../../apiRoutes";
export default {
  components: { TextInput, SpinnerLoading },
  mixins: [validationMixin],
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmation: "",
      isLoading: false,
      submited: false,
    };
  },
  validations() {
    return {
      currentPassword: {
        required,
        validFormat: validatePassword,
      },
      newPassword: {
        required,
        validFormat: validatePassword,
        isNotEqualToOld: (v) =>
          v ? v.trim() != this.currentPassword.trim() : true,
      },
      confirmation: {
        required,
        isEqual: (v) => (v ? this.newPassword == v : true),
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isLoading = true;
        await this.updateClientPassword({ ...this.$data });
        this.isLoading = false;
      }
    },
    async updateClientPassword({ currentPassword, newPassword }) {
      try {
        await this.$api.$put(API_ROUTES.updateClientPassword, {
          currentPassword,
          newPassword,
        });
        this.$notify({ messageRef: "CLIENT_UPDATE_PASSWORD_SUCCESS" });
        this.$router.push("/client/tree");
      } catch (err) {
        this.handleUpdateClientPasswordApiErrors(err);
      }
    },
    handleUpdateClientPasswordApiErrors(err) {
      const error = err?.response?.data?.error || "UNEXPECTED_ERROR";

      this.$notify({ messageRef: error });
    },
  },
};
</script>

<style lang="scss" scoped>
.update-password-form {
  @screen lg {
    @apply p-4;
  }
}
</style>