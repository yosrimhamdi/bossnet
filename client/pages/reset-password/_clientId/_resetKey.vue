<template>
  <section class="reset-password">
    <div class="form-container">
      <div class="shape"></div>
      <div class="content">
        <h2>Créer un nouveau mot de passe</h2>
        <p>
          Veuillez saisir votre nouveau mot de passe pour vous connecter à votre
          compte.
        </p>
        <form method="post" @submit.prevent="handleSubmit">
          <text-input
            :class="{ 'has-err': $v.password.$error && submited }"
            v-model.trim="$v.password.$model"
            type="password"
            label="Mot de passe"
            name="password"
            placeholder="************"
          >
            <template v-if="$v.password.$error">
              <small class="err" v-if="!$v.password.required"
                >Ce champ est requis</small
              >
              <small class="err" v-if="!$v.password.validFormat"
                >Ce champ doit contenir entre 8 et 128 caractères sans
                espaces.</small
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
                >Le mot de passe de confirmation ne correspond pas au mot de
                passe saisi.</small
              >
            </template>
          </text-input>

          <button
            :disabled="isLoading"
            type="submit"
            class="btn primary lg flat mt-12"
          >
            <spinner-loading v-if="isLoading" />
            <span v-else> Réinitialiser </span>
          </button>

          <router-link to="/signin" class="btn lg flat no-sh">
            Se connecter
          </router-link>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import TextInput from "../../../components/forms/TextInput.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { validatePassword } from "../../../utils/formsValidators";
import {
  validateId,
  validatePasswordResetKey,
} from "./../../../utils/routeParamsValidators";
import SpinnerLoading from "../../../components/utilities/SpinnerLoading.vue";
import API_ROUTES from "../../../apiRoutes";
export default {
  middleware: "notAuthenticated",
  head() {
    return {
      titleTemplate: `Réinitialiser votre mot de passe | %s`,
    };
  },
  validate({ params: { clientId, resetKey } }) {
    return validateId(clientId) && validatePasswordResetKey(resetKey);
  },
  components: { TextInput, SpinnerLoading },
  mixins: [validationMixin],
  data() {
    return {
      password: "",
      confirmation: "",
      isLoading: false,
      submited: false,
    };
  },
  validations() {
    return {
      password: {
        required,
        validFormat: validatePassword,
      },
      confirmation: {
        required,
        isEqual: (v) => (v ? this.password == this.confirmation : true),
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isLoading = true;
        const { clientId, resetKey } = this.$route.params;
        await this.resetPassword({
          clientId,
          resetKey,
          password: this.password,
        });
        this.isLoading = false;
      }
    },
    async resetPassword({ clientId, resetKey, password }) {
      try {
        await this.$api.$post(API_ROUTES.resetPassword, {
          clientId,
          resetKey,
          password,
        });
        this.$notify({ messageRef: "CLIENT_PASSWORD_RESET_SUCCESS" });
        this.$router.push("/signin");
      } catch (err) {
        this.handleResetPasswordApiErrors(err);
      }
    },
    handleResetPasswordApiErrors(err) {
      const error = err?.response?.data?.error || "UNEXPECTED_ERROR";
      this.$notify({ messageRef: error });
      if (
        error == "CLIENT_PASSWORD_RESET_DOES_NOT_EXISTS_ERROR" ||
        error == "CLIENT_PASSWORD_RESET_EXPIRED_ERROR"
      ) {
        this.$router.push("/reset-password");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>