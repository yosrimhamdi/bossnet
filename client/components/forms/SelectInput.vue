<template>
  <div class="form-input">
    <label :for="name">{{ label }}</label>
    <select
      class="input"
      @input="(e) => $emit('input', e.target.value)"
      :name="name"
      :value="value"
    >
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.value }}
      </option>
    </select>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    options: Array, // [{id, value}]
    label: String,
    name: String,
  },
};
</script>
