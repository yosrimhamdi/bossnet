<template>
  <div class="search-input">
    <form
      @submit.prevent="handleSubmit"
      class="input"
      :class="{ 'is-focus': inputIsOnFocus }"
    >
      <search-icon />
      <input
        @blur="unfocusInput"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        autocomplete="off"
        @input="(e) => $emit('input', e.target.value)"
      />
      <template v-if="hasSubmitBtn">
        <transition name="fade">
          <button v-if="inputIsOnFocus" class="btn primary">Rechercher</button>
        </transition>
      </template>
    </form>
    <transition name="fade">
      <div v-if="hasChildren && inputIsOnFocus" class="result">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import SearchIcon from "../icons/SearchIcon.vue";
export default {
  components: {
    SearchIcon,
  },
  props: {
    value: String,
    placeholder: String,
    hasSubmitBtn: {
      type: Boolean,
      default: true,
    },
    hasChildren: {
      type: Boolean,
      default: true,
    },
    name: String,
  },
  data() {
    return {
      inputIsOnFocus: false,
    };
  },
  methods: {
    unfocusInput() {
      setTimeout(() => (this.inputIsOnFocus = false), 200);
    },
    handleSubmit() {
      this.$emit("handleSubmit");
      this.unfocusInput();
    },
  },
  watch: {
    value() {
      if (this.value && !this.inputIsOnFocus) {
        this.inputIsOnFocus = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  @apply relative overflow-visible;
}
.input {
  @apply flex items-center w-full
  h-12
    bg-gray-50 p-1 rounded-md shadow-sm
    border transition-colors;
  svg {
    @apply block w-12;
  }
  &.is-focus {
    @apply bg-gray-100;
  }
}
input {
  @apply bg-transparent ml-0 w-full 
    focus:outline-none;
}
.result {
  top: calc(100% + 12px);
  @apply z-20 absolute left-0 block w-full h-auto 
  max-h-52 overflow-auto bg-white py-4 
  rounded-md shadow-md border;
}
</style>