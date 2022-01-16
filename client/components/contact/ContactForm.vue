<template>
  <div class="form-container" anim="fade-right">
    <h1>Contactez-nous</h1>
    <form method="post" @submit.prevent="handleSubmit">
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

      <text-input
        :class="{ 'has-err': $v.email.$error && submited }"
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
        :class="{ 'has-err': $v.companyName.$error && submited }"
        v-model.trim="$v.companyName.$model"
        label="Société (optionnel)"
        name="companyname"
        placeholder="Le nom de votre société"
      >
        <template v-if="$v.companyName.$error">
          <small
            class="err"
            v-if="!$v.companyName.minLength || !$v.companyName.maxLength"
            >Ce champ doit contenir entre 2 et 50 caractères</small
          >
        </template>
      </text-input>

      <text-input
        :class="{ 'has-err': $v.mobilePhone.$error && submited }"
        v-model.trim="$v.mobilePhone.$model"
        label="Téléphone (optionnel)"
        name="mobilePhone"
        placeholder="+216 xx xxx xxx"
      >
        <template v-if="$v.mobilePhone.$error">
          <small class="err" v-if="!$v.mobilePhone.validFormat"
            >Ce champ est invalide (format: +216 xx xxx xxx)
          </small>
        </template>
      </text-input>

      <text-input
        :class="{ 'has-err': $v.message.$error && submited }"
        v-model.trim="$v.message.$model"
        :isTextArea="true"
        label="Message"
        name="message"
        placeholder="Commentaire, question, ..."
      >
        <template v-if="$v.message.$error">
          <small class="err" v-if="!$v.message.required"
            >Ce champ est requis</small
          >
          <small
            class="err"
            v-if="!$v.message.minLength || !$v.message.maxLength"
            >Ce champ doit contenir entre 10 et 300 caractères</small
          >
        </template>
      </text-input>

      <button :disabled="isLoading" type="submit" class="btn primary lg flat">
        <spinner-loading v-if="isLoading" />
        <span v-else>Envoyer</span>
      </button>
    </form>
  </div>
</template>

<script>
import TextInput from "../forms/TextInput.vue";
import { validationMixin } from "vuelidate";
import { validatePhoneNumber } from "./../../utils/formsValidators";

import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
import SpinnerLoading from "../utilities/SpinnerLoading.vue";
import API_ROUTES from "../../apiRoutes";

export default {
  mixins: [validationMixin],
  components: { TextInput, SpinnerLoading },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      mobilePhone: "",
      message: "",
      isLoading: false,
      submited: false,
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
    companyName: {
      minLength: minLength(2),
      maxLength: maxLength(50),
    },
    mobilePhone: {
      validFormat: validatePhoneNumber,
    },
    message: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(300),
    },
  },
  methods: {
    async handleSubmit() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isLoading = true;
        try {
          const recaptchaToken = await this.$recaptcha.execute("contact");
          await this.postContact({ ...this.$data, recaptchaToken });
        } catch (err) {
          this.$notify({ messageRef: "CAPTCHA_ERROR" });
        }
        this.isLoading = false;
      } else {
        this.$notify({ messageRef: "INPUTS_ERROR" });
      }
    },
    async postContact({
      firstName,
      lastName,
      email,
      companyName,
      mobilePhone,
      message,
      recaptchaToken,
    }) {
      try {
        await this.$api.$post(API_ROUTES.createContact, {
          firstName,
          lastName,
          email,
          companyName,
          mobilePhone,
          message,
          recaptchaToken,
        });
        this.$notify({ messageRef: "CONTACT_SUCCESS", autoHide: false });
        this.$router.push("/");
      } catch (err) {
        this.handlePostContactApiErrors(err);
      }
    },
    handlePostContactApiErrors(err) {
      const error = err?.response?.data?.error || "UNEXPECTED_ERROR";
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
.form-container {
  @apply block p-6 py-12 -mt-16 bg-white z-10 border shadow-md rounded-md w-full;
  @screen md {
    @apply p-12;
    max-width: 500px;
  }
  @screen lg {
    @apply m-0 -ml-16 mt-32 w-auto;
  }
}
form {
  @apply mt-12;
  button {
    @apply mt-8;
  }
}

h1 {
  @apply text-4xl font-extrabold text-primary;
  @screen md {
    @apply text-5xl;
  }
}
</style>