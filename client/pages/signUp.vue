<template>
  <section class="signup">
    <div class="shape"></div>
    <div class="content">
      <h1>Créer un compte <span>Client</span></h1>
      <form method="post" @submit.prevent="handleSubmit">
        <h3>Coordonnées</h3>
        <div class="input-group">
          <text-input
            :class="{ 'has-err': $v.lastName.$error && submited }"
            v-model.trim="$v.lastName.$model"
            label="Nom"
            name="lastname"
            placeholder="Entrer votre nom"
          >
            <template v-if="$v.lastName.$error">
              <small class="err" v-if="!$v.lastName.required"
                >Ce champ est requis</small
              >
              <small
                class="err"
                v-if="!$v.lastName.minLength || !$v.lastName.maxLength"
                >Ce champ doit contenir entre 2 et 50 caractères</small
              >
            </template>
          </text-input>

          <text-input
            :class="{ 'has-err': $v.firstName.$error && submited }"
            v-model.trim="$v.firstName.$model"
            label="Prénom"
            name="firstname"
            placeholder="Entrer votre prénom"
          >
            <template v-if="$v.firstName.$error">
              <small class="err" v-if="!$v.firstName.required"
                >Ce champ est requis</small
              >
              <small
                class="err"
                v-if="!$v.firstName.minLength || !$v.firstName.maxLength"
                >Ce champ doit contenir entre 2 et 50 caractères</small
              >
            </template>
          </text-input>
        </div>
        <div class="input-group">
          <text-input
            :class="{ 'has-err': $v.mobilePhone.$error && submited }"
            v-model.trim="$v.mobilePhone.$model"
            label="Téléphone"
            name="mobilePhone"
            placeholder="+216 xx xxx xxx"
          >
            <template v-if="$v.mobilePhone.$error">
              <small class="err" v-if="!$v.mobilePhone.required"
                >Ce champ est requis</small
              >
              <small class="err" v-if="!$v.mobilePhone.validFormat"
                >Ce champ est invalide (format: +216 xx xxx xxx)
              </small>
            </template>
          </text-input>

          <select-input
            v-model="gender"
            label="Genre"
            name="gender"
            :options="[
              { id: 'm', value: 'Homme' },
              { id: 'f', value: 'Femme' },
            ]"
          ></select-input>
        </div>
        <text-input
          :class="{ 'has-err': $v.facebookAccountLink.$error && submited }"
          v-model.trim="$v.facebookAccountLink.$model"
          label="Lien de compte Facebook (optionnel)"
          name="facebookAccountLink"
          placeholder="Exp: www.facebook.com/profile.php?id=1000103762550"
        >
          <template v-if="$v.facebookAccountLink.$error">
            <!-- <small class="err" v-if="!$v.facebookAccountLink.required"
              >Ce champ est requis</small
            > -->
            <small class="err" v-if="!$v.facebookAccountLink.validFormat"
              >Ce champ est invalide (exemple:
              www.facebook.com/profile.php?id=1000103762550)</small
            >
          </template>
        </text-input>
        <text-input
          :class="{
            'has-err':
              ($v.parentId.$error && submited) ||
              parentDoesNotExistsError ||
              parentHasFullChildrenError,
          }"
          v-model.trim="$v.parentId.$model"
          label="Identifiant du parent"
          name="parentId"
          placeholder="Exp: 61c27750cc56ec308a258254"
        >
          <template v-if="$v.parentId.$error">
            <small class="err" v-if="!$v.parentId.required"
              >Ce champ est requis</small
            >
            <small class="err" v-if="!$v.parentId.validFormat"
              >Ce champ est invalide</small
            >
          </template>
          <small class="err" v-if="parentDoesNotExistsError"
            >Ce parent n'existe pas</small
          >
          <small class="err" v-if="parentHasFullChildrenError"
            >Ce parent n'est pas disponible pour l'inscription</small
          >
        </text-input>

        <h3>Informations Confidentiel</h3>
        <text-input
          :class="{ 'has-err': $v.cinId.$error && submited }"
          v-model.trim="$v.cinId.$model"
          label="CIN - Numéro carte d'identité nationale"
          name="cinId"
          placeholder="Exp: 012345678"
        >
          <template v-if="$v.cinId.$error">
            <small class="err" v-if="!$v.cinId.required"
              >Ce champ est requis</small
            >
            <small class="err" v-if="!$v.cinId.validFormat"
              >Ce champ est invalide (exemple: 012345678)</small
            >
          </template>
        </text-input>
        <text-input
          :class="{ 'has-err': $v.rib.$error && submited }"
          v-model.trim="$v.rib.$model"
          label="RIB - Relevé d'identité bancaire (optionnel)"
          name="rib"
          placeholder="Exp: 10 006 0351835984788 31"
        >
          <template v-if="$v.rib.$error">
            <!-- <small class="err" v-if="!$v.rib.required"
              >Ce champ est requis</small
            > -->
            <small class="err" v-if="!$v.rib.validFormat">
              <span>Ce champ est invalide</span>
              <div class="rib-info">
                <span><strong>Exemple:</strong> 10 006 0351835984788 31</span>
                <ul>
                  <li><strong>10</strong> Code banque</li>
                  <li><strong>006</strong> Code agence</li>
                  <li><strong>0351835984788</strong> Numéro de compte</li>
                  <li><strong>31</strong> Chiffre de contrôle - Clé</li>
                </ul>
              </div>
            </small>
          </template>
        </text-input>

        <h3>Connection</h3>
        <text-input
          :class="{
            'has-err': ($v.email.$error && submited) || emailAlreadyExistsError,
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
          <small class="err" v-if="emailAlreadyExistsError"
            >Un client avec cet email existe déjà</small
          >
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
        </text-input>

        <checkbox-input
          :class="{ 'has-err': $v.accept.$error && submited }"
          v-model="$v.accept.$model"
        >
          <small class="font-normal text-sm"
            >J'ai lu et j'accepte
            <a href="/general-conditions" target="blank" class="text-primary">
              les Conditions générales</a
            >
            de bossnet.</small
          >
        </checkbox-input>

        <button
          :disabled="isLoading"
          type="submit"
          class="btn primary lg flat mt-12"
        >
          <spinner-loading v-if="isLoading" />
          <span v-else>Créer un compte</span>
        </button>

        <router-link to="/signin" class="btn lg flat no-sh">
          Se connecter
        </router-link>
      </form>
    </div>
  </section>
</template>

<script>
import SelectInput from "../components/forms/SelectInput.vue";
import TextInput from "../components/forms/TextInput.vue";
import { validationMixin } from "vuelidate";
import {
  validatePhoneNumber,
  validateFacebookProfileLink,
  validateCinId,
  validateRib,
  validatePassword,
  validateMongoId,
} from "./../utils/formsValidators";
import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
import SpinnerLoading from "../components/utilities/SpinnerLoading.vue";
import API_ROUTES from "../apiRoutes";
import CheckboxInput from "../components/forms/CheckboxInput.vue";

export default {
  middleware: "notAuthenticated",
  head() {
    return {
      titleTemplate: `Créer un compte client | %s`,
    };
  },
  components: { TextInput, SelectInput, SpinnerLoading, CheckboxInput },
  mixins: [validationMixin],
  data() {
    return {
      firstName: "",
      lastName: "",
      mobilePhone: "",
      gender: "m",
      facebookAccountLink: "",
      email: "",
      cinId: "",
      rib: "",
      password: "",
      parentId: this.$route.query.parentId || "",
      accept: false,

      isLoading: false,
      submited: false,
      parentDoesNotExistsError: false,
      parentHasFullChildrenError: false,
      emailAlreadyExistsError: false,
    };
  },
  validations: {
    firstName: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(50),
    },
    lastName: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(50),
    },
    email: {
      required,
      email,
    },
    mobilePhone: {
      required,
      validFormat: validatePhoneNumber,
    },
    facebookAccountLink: {
      validFormat: validateFacebookProfileLink,
    },
    cinId: {
      required,
      validFormat: validateCinId,
    },
    rib: {
      //   required,
      validFormat: validateRib,
    },
    password: {
      required,
      validFormat: validatePassword,
    },
    parentId: {
      required,
      validFormat: validateMongoId,
    },
    accept: {
      isTrue: (v) => v == true,
    },
  },
  methods: {
    async handleSubmit() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.parentHasFullChildrenError = false;
        this.parentDoesNotExistsError = false;
        this.emailAlreadyExistsError = false;
        this.isLoading = true;
        try {
          const recaptchaToken = await this.$recaptcha.execute("signup");
          await this.signUp({ ...this.$data, recaptchaToken });
        } catch (err) {
          this.$notify({ messageRef: "CAPTCHA_ERROR" });
        }
        this.isLoading = false;
      } else {
        this.$notify({ messageRef: "INPUTS_ERROR" });
      }
    },
    async signUp({
      firstName,
      lastName,
      gender,
      mobilePhone,
      facebookAccountLink,
      cinId,
      rib,
      email,
      password,
      parentId,
      recaptchaToken,
    }) {
      try {
        await this.$api.$post(API_ROUTES.signUp, {
          firstName,
          lastName,
          gender,
          mobilePhone,
          facebookAccountLink,
          cinId,
          rib,
          email,
          password,
          parentId,
          recaptchaToken,
        });
        this.$notify({ messageRef: "SIGNUP_SUCCESS", autoHide: false });
        this.$router.push("/");
      } catch (err) {
        this.handleSignUpApiErrors(err);
      }
    },
    handleSignUpApiErrors(err) {
      const error = err?.response?.data?.error || "UNEXPECTED_ERROR";
      if (error == "PARENT_HAS_FULL_CHILDREN_ERROR") {
        this.parentHasFullChildrenError = true;
      } else if (error == "PARENT_NOT_FOUND_ERROR") {
        this.parentDoesNotExistsError = true;
      } else if (error == "EMAIL_ALREADY_EXISTS_ERROR") {
        this.emailAlreadyExistsError = true;
      }
      this.$notify({ messageRef: error });
    },
  },
  async mounted() {
    try {
      await this.$recaptcha.init();
    } catch (e) {
      this.$notify({ messageRef: "CAPTCHA_ERROR" });
    }
  },
  beforeDestroy() {
    this.$recaptcha.destroy();
  },
};
</script>

<style lang="scss" scoped>
.signup {
  @apply relative pt-4 pl-4 my-8 w-full;
  @screen lg {
    width: 500px;
    @apply pt-6 pl-8 my-12;
  }
  @screen xl {
    width: 700px;
  }
}
.shape {
  @apply absolute bg-dark top-0 left-0 z-0 w-4/6 h-1/3 rounded;
}
.content {
  @apply relative p-8 py-12 bg-white border 
  rounded shadow-md;
  @screen md {
    @apply p-12;
  }
}
h1 {
  @apply text-4xl font-extrabold mb-12;
  @screen md {
    @apply text-5xl;
  }
  @screen lg {
    @apply text-6xl;
  }
}
h3 {
  @apply mb-4 mt-8 pb-2 border-b text-xl font-semibold text-gray-600;
  @scree lg {
    @apply text-2xl;
  }
}
.rib-info {
  @apply text-dark border-l pl-2 text-base;
  strong {
    @apply text-sm;
  }
}
</style>