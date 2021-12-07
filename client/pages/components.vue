<template>
  <div class="components">
    <div class="btns">
      <h1 class="text-2xl font-bold mb-4 border-b pb-4">Buttons</h1>
      <div class="block">
        <button class="btn lg">Large</button>
        <button class="btn md">Medium</button>
        <button class="btn no-sh underline">Small</button>
      </div>

      <div class="block my-4">
        <button class="btn primary">Primary</button>
        <button class="btn md dark">Medium dark</button>
        <button class="btn lg light">Large light</button>
      </div>

      <div class="block w-96 my-4">
        <button class="btn md flat white-primary">Large</button>
        <button class="btn md flat dark my-4">Medium flat</button>
        <button class="btn lg flat start light">Medium flat</button>
      </div>

      <div class="block my-4">
        <button class="btn sq"><arrow-right-icon /></button>
        <button class="btn"><arrow-right-icon class="left" /> Small</button>
        <button class="btn light">Small <arrow-right-icon /></button>
        <button class="btn primary md">Medium <arrow-right-icon /></button>
        <button class="btn dark lg">Large <arrow-right-icon /></button>
        <button class="btn white-primary md">
          Medium <arrow-right-icon />
        </button>
      </div>
    </div>

    <div class="inputs my-8">
      <h1 class="text-2xl font-bold mb-4 border-b pb-4">Inputs</h1>
      <text-input
        class="has-err"
        label="Nom"
        name="firstname"
        placeholder="Entrer votre nom"
      >
        <small class="err">Ce champ est requis!</small>
      </text-input>

      <text-input
        label="Prénom"
        name="lastname"
        placeholder="Entrer votre prénom"
      >
        <small>Ce champ est requis!</small>
      </text-input>

      <div class="input-group">
        <text-input
          class="has-err"
          label="Nom"
          name="firstname"
          placeholder="Entrer votre nom"
        >
          <small class="err">Ce champ est requis!</small>
        </text-input>

        <text-input
          label="Mot de passe"
          type="password"
          name="lastname"
          placeholder="******************"
        >
          <small>Ce champ est requis!</small>
        </text-input>
      </div>
      <div class="input-group">
        <text-input
          label="Téléphone mobile"
          name="phone"
          placeholder="(+216) dd ddd ddd"
        >
          <small>Ce champ est requis!</small>
        </text-input>
        <select-input
          v-model="gender"
          label="Gender"
          name="gender"
          :options="[
            { id: 'm', value: 'Homme' },
            { id: 'w', value: 'Femme' },
          ]"
        ></select-input>
      </div>

      <checkbox-input v-model="checkBoxValue">
        <small class="font-semibold text-sm">Accept our terms</small>
      </checkbox-input>

      <search-input
        placeholder="Rechercher partenaires par nom, categorie, ...."
        name="Search"
      />
    </div>

    <div class="dropdowns mb-32">
      <h1 class="text-2xl font-bold mb-4 border-b pb-4">Dropdown</h1>
      <dropdown direction="lb">
        <template #toggler="{ open }">
          <button class="btn md dark">
            Toggle dropdown
            <arrow-small-bottom-icon
              :class="{ 'transform rotate-180': open }"
            />
          </button>
        </template>
        <template #content>
          <div class="dropdown-content">
            <button class="drop-btn">Chaneb food</button>
            <button class="drop-btn">Monoprix</button>
            <button class="drop-btn">Carrefour</button>
          </div>
        </template>
      </dropdown>
      <dropdown direction="lb">
        <template #toggler="{ open }">
          <button class="btn md no-sh">
            Toggle dropdown
            <arrow-small-bottom-icon
              :class="{ 'transform rotate-180': open }"
            />
          </button>
        </template>
        <template #content>
          <div class="dropdown-content">
            <button class="drop-btn">Chaneb food</button>
            <button class="drop-btn">Monoprix</button>
            <button class="drop-btn">Carrefour</button>
          </div>
        </template>
      </dropdown>
    </div>
    <div class="swipers mb-32">
      <h1 class="text-2xl font-bold mb-4 border-b pb-4">Swipers</h1>

      <swiper :autoSwipeEachSeconds="2">
        <div class="img">
          <img
            src="https://i.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA"
          />
        </div>
        <div class="img">
          <img
            src="https://i.picsum.photos/id/1060/536/354.jpg?blur=2&hmac=0zJLs1ar00sBbW5Ahd_4zA6pgZqCVavwuHToO6VtcYY"
          />
        </div>

        <div class="img">
          <img
            src="https://i.picsum.photos/id/124/536/354.jpg?hmac=XVOPGQ2SNe6xS1YUUMyJVGgmHhvyMZiverZOcU3fZ1U"
          />
        </div>

        <div class="img">
          <img
            src="https://i.picsum.photos/id/175/536/354.jpg?hmac=EHlNLOT5uMj3h2CECyDN3o-puYqhu1a9chiXMuvQWCw"
          />
        </div>
      </swiper>
      <swiper :autoHideBtns="true">
        <div class="img">
          <img
            src="https://i.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA"
          />
        </div>
        <div class="img">
          <img
            src="https://i.picsum.photos/id/1060/536/354.jpg?blur=2&hmac=0zJLs1ar00sBbW5Ahd_4zA6pgZqCVavwuHToO6VtcYY"
          />
        </div>
      </swiper>
    </div>
    <div class="others mb-32">
      <h1 class="text-2xl font-bold mb-4 border-b pb-4">Tabs nav</h1>
      <tabs-nav
        v-model="selectedTab"
        :tabs="[
          { id: 'tr', title: 'Arbre' },
          { id: 'tb', title: 'Tableau' },
        ]"
      />
      <tabs-nav
        class="center"
        v-model="selectedTab"
        :tabs="[
          { id: 'tr', title: 'Arbre' },
          { id: 'tb', title: 'Tableau' },
        ]"
      />
      <tabs-nav
        class="end"
        v-model="selectedTab"
        :tabs="[
          { id: 'tr', title: 'Arbre' },
          { id: 'tb', title: 'Tableau' },
        ]"
      />
    </div>
  </div>
</template>

<script>
import ArrowRightIcon from "../components/icons/ArrowRightIcon.vue";
import TextInput from "../components/forms/TextInput.vue";
import SelectInput from "../components/forms/SelectInput.vue";
import CheckboxInput from "../components/forms/CheckboxInput.vue";
import Dropdown from "../components/utilities/Dropdown.vue";
import ArrowSmallBottomIcon from "../components/icons/ArrowSmallBottomIcon.vue";
import SearchInput from "../components/forms/SearchInput.vue";
import Swiper from "../components/utilities/Swiper.vue";
import TabsNav from "../components/utilities/TabsNav.vue";
export default {
  components: {
    ArrowRightIcon,
    TextInput,
    SelectInput,
    CheckboxInput,
    Dropdown,
    ArrowSmallBottomIcon,
    SearchInput,
    Swiper,
    TabsNav,
  },
  data() {
    return {
      gender: "f",
      checkBoxValue: true,
      selectedTab: "tr",
    };
  },
};
</script>

<style lang="scss" scoped>
.components {
  @apply block p-8;
}
.btns {
  button {
    @apply mr-4 my-2;
  }
}
.img {
  @apply p-8 w-full min-w-full;
  height: 400px;
  img {
    @apply object-cover rounded-md w-full;
    height: 100%;
  }
}
</style>