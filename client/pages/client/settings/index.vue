<template>
  <section class="update-client-data-form">
    <form method="POST" @submit.prevent="handleSubmit">
      <h1>Modifier vos informations personnelles</h1>

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

      <h3>Confirmation</h3>

      <text-input
        :class="{ 'has-err': $v.password.$error && submited }"
        v-model.trim="$v.password.$model"
        type="password"
        label="Mot de passe actuel"
        name="password"
        placeholder="************"
      >
        <template v-if="$v.password.$error">
          <small class="err" v-if="!$v.password.required"
            >Ce champ est nécessaire pour confirmer les modifications.</small
          >
          <small class="err" v-if="!$v.password.validFormat"
            >Ce champ doit contenir entre 8 et 128 caractères sans
            espaces.</small
          >
        </template>
        <small v-else>
          Ce champ est nécessaire pour confirmer les modifications.</small
        >
      </text-input>
      <button
        :disabled="isLoading"
        type="submit"
        class="btn primary lg flat mt-12"
      >
        <spinner-loading v-if="isLoading" />
        <span v-else>Sauvegarder</span>
      </button>
    </form>
  </section>
</template>

<script>
import SelectInput from "../../../components/forms/SelectInput.vue";
import TextInput from "../../../components/forms/TextInput.vue";
import { validationMixin } from "vuelidate";
import {
  validatePhoneNumber,
  validateFacebookProfileLink,
  validateCinId,
  validateRib,
  validatePassword,
} from "./../../../utils/formsValidators";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import SpinnerLoading from "../../../components/utilities/SpinnerLoading.vue";
import API_ROUTES from "../../../apiRoutes";
export default {
  components: { TextInput, SelectInput, SpinnerLoading },
  mixins: [validationMixin],
  computed: {
    client() {
      return this.$store.state.client;
    },
  },
  data() {
    const { profile, cinId, rib } = this.$store.state.client;
    return {
      ...profile,
      cinId,
      rib,
      password: "",
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
  },
  methods: {
    async handleSubmit() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isLoading = true;
        await this.updateClientData({ ...this.$data });
        this.isLoading = false;
      }
    },
    async updateClientData({
      password,
      firstName,
      lastName,
      gender,
      mobilePhone,
      facebookAccountLink,
      cinId,
      rib,
    }) {
      try {
        await this.$api.$put(API_ROUTES.updateClientData, {
          password,
          firstName,
          lastName,
          gender,
          mobilePhone,
          facebookAccountLink,
          cinId,
          rib,
        });
        this.$store.commit("setClient", {
          ...this.client,
          ...{
            profile: {
              firstName,
              lastName,
              gender,
              mobilePhone,
              facebookAccountLink,
            },
            cinId,
            rib,
          },
        });
        this.$notify({ messageRef: "CLIENT_UPDATE_DATA_SUCCESS" });
        this.$router.push("/client/tree");
      } catch (err) {
        this.handleUpdateClientApiErrors(err);
      }
    },
    handleUpdateClientDataApiErrors(err) {
      const error = err?.response?.data?.error || "UNEXPECTED_ERROR";

      this.$notify({ messageRef: error });
    },
  },
};
</script>

<style lang="scss" scoped>
.update-client-data-form {
  @screen md {
    @apply p-4;
  }
}
h3 {
  @apply mb-4 mt-8 pb-2 border-b text-xl font-semibold text-gray-600;
  @scree lg {
    @apply text-2xl;
  }
}
</style>