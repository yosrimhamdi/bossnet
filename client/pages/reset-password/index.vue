<template>
  <section class="reset-password">
    <div class="form-container">
      <div class="shape"></div>
      <div class="content">
        <template v-if="submitComplete">
          <img
            src="~/assets/images/emailsent.png"
            alt="mail"
            anim="fade-left"
          />
          <h2>Email envoyé</h2>
          <p class="success">
            Vérifiez votre courrier électronique pour trouver un lien permettant
            de réinitialiser votre mot de passe.
          </p>
          <p class="success">
            S'il n'apparaît pas dans quelques minutes, vérifiez votre dossier
            spam.<br />
          </p>
          <small>
            <strong> Remarque :</strong> Ce lien expire après 2 heures.</small
          >
        </template>
        <template v-else>
          <h2>Mot de passe oublié</h2>

          <p>
            Tapez l'e-mail de votre compte pour vous envoyer un lien de
            réinitialisation de mot de passe.
          </p>

          <form method="post" @submit.prevent="handleSubmit">
            <text-input
              :class="{
                'has-err': $v.email.$error && submited,
              }"
              v-model.trim="$v.email.$model"
              label="E-mail"
              name="email"
              placeholder="example@email.com"
            >
              <template v-if="$v.email.$error">
                <small class="err" v-if="!$v.email.required"
                  >Ce champ est requis</small
                >
                <small class="err" v-if="!$v.email.email"
                  >Ce champ est invalide</small
                >
              </template>
            </text-input>

            <button
              :disabled="isLoading"
              type="submit"
              class="btn primary lg flat mt-12"
            >
              <spinner-loading v-if="isLoading" />
              <span v-else> Envoyer </span>
            </button>

            <router-link to="/signin" class="btn lg flat no-sh">
              Se connecter
            </router-link>
          </form>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import TextInput from "../../components/forms/TextInput.vue";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import SpinnerLoading from "../../components/utilities/SpinnerLoading.vue";
import API_ROUTES from "../../apiRoutes";
export default {
  middleware: "notAuthenticated",
  components: { TextInput, SpinnerLoading, SpinnerLoading },
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      isLoading: false,
      submited: false,
      submitComplete: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    async handleSubmit() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isLoading = true;
        await this.sendResetPasswordRequest(this.$data);
        this.isLoading = false;
      }
    },
    async sendResetPasswordRequest({ email }) {
      try {
        await this.$api.$post(API_ROUTES.resetPasswordRequest, {
          email,
        });
        this.submitComplete = true;
      } catch (err) {
        const error = err?.response?.data?.error || "UNEXPECTED_ERROR";
        this.$notify({ messageRef: error });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.success {
  @apply mb-4;
}
</style>