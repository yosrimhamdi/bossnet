<template>
  <section class="signin">
    <div class="form-container">
      <div class="shape"></div>
      <div class="content">
        <h1>Se connecter</h1>
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
            <router-link to="/reset-password" class="reset-pass-link"
              >Mot de passe oublié ?</router-link
            >
          </text-input>

          <button
            :disabled="isLoading"
            type="submit"
            class="btn primary lg flat mt-12"
          >
            <spinner-loading v-if="isLoading" />
            <span v-else> Se connecter </span>
          </button>

          <router-link to="/signup" class="btn lg flat no-sh">
            Créer un compte
          </router-link>
        </form>
      </div>
    </div>
    <img src="~/assets/images/signin.png" alt="Arbre bossnet" />
  </section>
</template>

<script>
import TextInput from "../components/forms/TextInput.vue";
import { validationMixin } from "vuelidate";
import { validatePassword } from "./../utils/formsValidators";
import { required, email } from "vuelidate/lib/validators";
import SpinnerLoading from "../components/utilities/SpinnerLoading.vue";
export default {
  middleware: "notAuthenticated",
  head() {
    return {
      titleTemplate: `Se connecter | %s`,
    };
  },
  components: { TextInput, SpinnerLoading },
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      password: "",

      isLoading: false,
      submited: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      validFormat: validatePassword,
    },
  },
  methods: {
    async handleSubmit() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isLoading = true;
        await this.signIn(this.$data);
        this.isLoading = false;
      }
    },
    async signIn({ email, password }) {
      try {
        const { data } = await this.$auth.loginWith("local", {
          data: { email, password },
        });
        this.$store.commit("setClient", data.client);
        this.$notify({ messageRef: "SIGNIN_SUCCESS" });
        this.redirect();
      } catch (err) {
        const error = err?.response?.data?.error || "UNEXPECTED_ERROR";
        this.$notify({ messageRef: error });
      }
    },
    redirect() {
      const redirectPath = this.$route.query.redirect || "/client/tree";
      this.$router.push(redirectPath);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  @apply mt-12;
  @screen lg {
    @apply ml-12 mt-0;
  }
}
.signin {
  @apply flex items-center justify-center flex-wrap;
}
.reset-pass-link {
  @apply text-base text-primary mt-1 text-right block;
  &:hover {
    @apply underline;
  }
}
</style>