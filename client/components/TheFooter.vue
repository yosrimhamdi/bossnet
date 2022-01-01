<template>
  <footer>
    <logo />
    <nav>
      <div class="nav-links">
        <h3>Contactez-nous</h3>
        <ul>
          <li>
            <phone-icon class="foot-icon" />
            <a href="tel:+21645567778">+216 45 567 778</a>
          </li>
          <li>
            <location-icon class="foot-icon" />
            <a>Rue saleh ben yousef <br />bennen، Monastir 5025 </a>
          </li>
          <li>
            <email-icon class="foot-icon" />
            <a href="mailto:bossnet@contact.com">bossnet@contact.com</a>
          </li>
          <li>
            <clock-icon class="foot-icon" />
            <span to="/">
              De samedi jusqu'a Vendredi<br />
              8:00 - 16:00
            </span>
          </li>
        </ul>
      </div>

      <div class="nav-links">
        <h3>Naviguer</h3>
        <ul>
          <li>
            <router-link to="/partners">Partenaires</router-link>
          </li>
          <li>
            <router-link to="/categories">Catégories</router-link>
          </li>
          <li>
            <router-link to="/about">À propos</router-link>
          </li>
          <li>
            <router-link to="/contact">Contact</router-link>
          </li>
        </ul>
      </div>
      <div class="nav-links">
        <h3>Clients</h3>
        <ul>
          <li>
            <router-link to="/client">Mon compte</router-link>
          </li>
          <li>
            <router-link to="/signup">S'inscrire</router-link>
          </li>
        </ul>
      </div>
      <div class="nav-links">
        <h3>Autres</h3>
        <ul>
          <li v-for="(customPage, i) in customPages" :key="i">
            <router-link :to="`/custom-pages/${customPage._id}`">{{
              customPage.title
            }}</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="bottom">
      <div class="content">
        <p>© {{ currentDate }} Bossnet.Tous les droits sont réservés.</p>
        <div class="socials">
          <a href="/">
            <facebook-icon />
          </a>
          <a href="/"> <twitter-icon /> </a>
          <a href="/"> <whats-icon /> </a>
          <a href="/"> <youtube-icon /> </a>
        </div>
      </div>
      <circle-shape class="circle" />
    </div>
  </footer>
</template>

<script>
import ClockIcon from "./icons/ClockIcon.vue";
import EmailIcon from "./icons/EmailIcon.vue";
import LocationIcon from "./icons/LocationIcon.vue";
import PhoneIcon from "./icons/PhoneIcon.vue";
import FacebookIcon from "./icons/social/FacebookIcon.vue";
import TwitterIcon from "./icons/social/TwitterIcon.vue";
import WhatsIcon from "./icons/social/WhatsIcon.vue";
import YoutubeIcon from "./icons/social/YoutubeIcon.vue";
import CircleShape from "./shapes/CircleShape.vue";
export default {
  computed: {
    currentDate() {
      return new Date().getFullYear();
    },
    customPages() {
      return this.$store.state.footer.customPages;
    },
  },
  components: {
    CircleShape,
    PhoneIcon,
    EmailIcon,
    ClockIcon,
    FacebookIcon,
    WhatsIcon,
    TwitterIcon,
    YoutubeIcon,
    LocationIcon,
  },
};
</script>

<style lang="scss" scoped>
footer {
  @apply relative w-full bg-dark text-white px-12 py-16 h-auto
    overflow-hidden;
}
.circle {
  @screen sm {
    right: 0;
    bottom: 0;
  }
  right: 0;
  bottom: -100px;
  @apply absolute z-0;
}
nav {
  @apply flex items-start justify-start flex-wrap mt-16;
}
.nav-links {
  min-width: 300px;
  @scree lg {
    max-width: 300px;
  }
  @apply relative p-4 max-w-full z-10;
  h3 {
    @apply text-xl uppercase font-semibold my-4;
  }
  ul {
    @apply ml-2;
  }
  li {
    @apply text-gray-200 py-2 flex font-normal items-center text-sm;
    .foot-icon {
      @apply mr-4 w-5 h-5 my-1;
    }
    &:hover {
      @apply underline;
    }
  }
}
.bottom {
  @apply flex items-end justify-start mt-8;
}
.content {
  @screen md {
    @apply mr-40;
  }
  @apply relative z-10 border-t border-gray-500 w-full mr-12 pt-4
  flex items-center justify-between flex-wrap;
  p {
    @apply text-sm;
  }
}
.socials {
  @screen md {
    @apply m-0;
  }
  @apply flex items-center my-4;
  a {
    @apply mr-4 break-words;
    svg {
      @apply w-8 h-8;
    }
  }
}
</style>
<style lang="scss">
footer .nav-links .foot-icon path {
  stroke: rgb(249, 250, 251);
}
</style>