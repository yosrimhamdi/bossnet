<template>
  <div class="form-input">
    <label :for="name">{{ label }}</label>
    <input
      :type="type"
      :value="value"
      :name="name"
      :placeholder="placeholder"
      class="input"
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
  },
};
</script>
