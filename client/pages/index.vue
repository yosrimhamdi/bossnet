<template>
  <div>
    <Header />
    <main style="height: 100vh"></main>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>
