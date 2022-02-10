<template>
  <section class="contact">
    <div class="info" anim="fade-left">
      <h2>BossNet</h2>
      <ul>
        <li v-if="siteSettings.phoneNumbers.length">
          <phone-icon class="info-icon" />
          <div>
            <a
              v-for="(phone, i) in siteSettings.phoneNumbers"
              :key="i"
              :href="'tel:' + phone"
              >{{ phone }}<br
            /></a>
          </div>
        </li>
        <li>
          <email-icon class="info-icon" />
          <a :href="'mailto:' + siteSettings.email">
            {{ siteSettings.email }}
          </a>
        </li>
        <li v-if="siteSettings.locations.length">
          <location-icon class="info-icon" />
          <div>
            <span v-for="(location, i) in siteSettings.locations" :key="i"
              >{{ location }}<br
            /></span>
          </div>
        </li>
        <li v-if="siteSettings.timing">
          <clock-icon class="info-icon" />
          <span>
            {{ siteSettings.timing }}
          </span>
        </li>
      </ul>
      <div class="socials">
        <a href="/">
          <facebook-icon />
        </a>
        <a href="/"> <twitter-icon /> </a>
        <a href="/"> <whats-icon /> </a>
        <a href="/"> <youtube-icon /> </a>
      </div>
    </div>
    <contact-form />
  </section>
</template>

<script>
import ContactForm from "../components/contact/ContactForm.vue";
import ClockIcon from "../components/icons/ClockIcon.vue";
import EmailIcon from "../components/icons/EmailIcon.vue";
import LocationIcon from "../components/icons/LocationIcon.vue";
import PhoneIcon from "../components/icons/PhoneIcon.vue";
import FacebookIcon from "../components/icons/social/FacebookIcon.vue";
import TwitterIcon from "../components/icons/social/TwitterIcon.vue";
import WhatsIcon from "../components/icons/social/WhatsIcon.vue";
import YoutubeIcon from "../components/icons/social/YoutubeIcon.vue";

export default {
  head() {
    return {
      titleTemplate: `Contact | %s`,
    };
  },
  components: {
    PhoneIcon,
    EmailIcon,
    LocationIcon,
    FacebookIcon,
    TwitterIcon,
    WhatsIcon,
    YoutubeIcon,
    ClockIcon,
    ContactForm,
  },
  computed: {
    siteSettings() {
      return this.$store.state.siteSettings;
    },
  },
};
</script>


<style lang="scss" scoped>
.contact {
  @apply mb-12 flex items-start justify-center flex-wrap;
}

h2 {
  @apply text-4xl font-extrabold text-primary;
  @screen md {
    @apply text-5xl;
  }
}
ul {
  @apply my-12;
}
li {
  @apply flex items-start my-4 text-gray-200 font-semibold;
  svg {
    @apply mr-4;
  }
}
.info {
  max-width: 500px;
  @apply relative bg-dark text-white p-6 pb-24 rounded-md shadow-md z-0 w-full mx-2;
  @screen md {
    @apply p-12 pb-32;
  }
  @screen lg {
    @apply pr-32 pb-12 w-auto;
  }
}
.socials {
  @apply flex items-center;
  a {
    @apply mr-4;
    svg {
      @apply w-8 h-8;
    }
  }
}
</style>
<style lang="scss">
.contact .info-icon path {
  stroke: rgb(249, 250, 251);
}
</style>