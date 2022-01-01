<template>
  <section>
    {{ client }}
    <button @click="logout" class="btn">Logout</button>
  </section>
</template>

<script>
export default {
  middleware: "authenticated",
  computed: {
    client() {
      return "hii";
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$store.commit("setClient", null);
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>