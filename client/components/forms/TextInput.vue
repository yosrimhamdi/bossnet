<template>
  <div class="form-input">
    <label :for="name">{{ label }}</label>
    <textarea
      v-if="isTextArea"
      :value="value"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      class="input"
      @input="(e) => $emit('input', e.target.value)"
    ></textarea>
    <input
      v-else
      :type="type"
      :value="value"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      class="input"
      autocapitalize="none"
      @input="(e) => $emit('input', e.target.value)"
    />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    type: { type: String, default: "text" },
    placeholder: String,
    name: String,
    isTextArea: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
