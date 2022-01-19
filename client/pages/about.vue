<template>
  <section class="about" anim="fade-up">
    <div class="part-1">
      <h1>
        <span>BOSSNET</span> est une société 100% Tunisienne de Network
        Marketing.
      </h1>
      <p>
        Elle est née parce que c'est l'avenir de nous, de vous et de toute la
        société, de léconomie et même du pays.<br />
        Avec Bossnet vous êtes gagnants et vous gagnez en tant qu'elle gagne.
      </p>
    </div>
    <div class="part-2">
      <img src="~/assets/images/about-1.svg" alt="La notion Gagnant-Gagnant" />

      <div class="info">
        <h2>Pourquoi ?</h2>
        <p>
          Dans Bossnet la méthode binaire est une des fortes stratégies suivi
          dans Network Marketing et qui garantie la notion Gagnant-Gagnant d'une
          manière rapide.
        </p>
      </div>
    </div>
    <div class="part-3">
      <h2>Comment ?</h2>
      <div class="part">
        <p>
          Bossnet est une société qui renforce la relation entre le consommateur
          qui cherche les promotions pour toujours et le commerçant qui cherche
          à minimiser le coût de la publicité.<br />
          Bossnet a garantie cela grâce à <span>la discount card</span> fournie
          à ses boss utilisable chez ses
          <router-link to="/partners">partenaires</router-link>.
        </p>
        <img src="~/assets/images/about-3.svg" alt="la discount card" />
      </div>

      <div class="part reversed">
        <p>
          Ca c'est le premier gain, le second Bossnet la bien organisé pour
          garantir sa continuité et la satisfaction des ses boss et ses
          <router-link to="/partners">partenaires</router-link> à travers un
          systême de travail récompensable très motivant qui se base sur la
          publicité par le parrainage équilibré gauche droite du
          <span>Network Marketing</span>.
        </p>
        <img src="~/assets/images/about-2.svg" alt="la DISCOUNT CARD" />
      </div>
    </div>
    <contact-us />
  </section>
</template>

<script>
import ContactUs from "../components/shared/ContactUs.vue";
export default {
  components: { ContactUs },
};
</script>

<style lang="scss" scoped>
.about {
  @apply p-4;
}
p {
  @apply pt-8 inline-block text-base font-semibold text-gray-700;
  @screen lg {
    @apply text-lg;
  }
}

h2 {
  @apply text-4xl font-extrabold inline-block text-primary;
  @screen lg {
    @apply text-5xl;
  }
}
.part-1 {
  max-width: 850px;
  @apply pb-12 border-b;
  @screen lg {
    @apply pb-24;
  }
  h1 {
    @apply text-4xl font-extrabold inline-block;
    @screen lg {
      @apply pr-24 text-5xl;
    }
  }
}
.part-2 {
  max-width: 850px;

  @apply py-12 flex flex-wrap items-center;
  @screen lg {
    @apply py-24;
  }
  img {
    @apply h-auto;
    @screen lg {
      max-width: 400px;
    }
  }
  .info {
    @apply pt-8;
    @screen lg {
      @apply pl-12 pt-0;
      max-width: 450px;
    }
  }
}
.part-3 {
  max-width: 850px;
  @apply py-12 mb-8 border-t border-b;
  @screen lg {
    @apply py-24 mb-12;
  }
  h2 {
    @apply text-4xl font-extrabold inline-block text-primary;
    @screen lg {
      @apply text-6xl mb-12;
    }
  }
  .part {
    @apply flex items-center flex-wrap my-2;
    @screen lg {
      @apply pl-8 my-8;
    }
    img {
      @apply h-auto;
      max-width: 200px;
    }
    p {
      @apply pb-8;
      @screen lg {
        @apply pt-0 pr-8;
        max-width: 600px;
      }
      a {
        @apply underline text-primary-dark;
      }
      span {
        @apply text-primary-dark;
      }
    }
    &.reversed {
      @apply flex-row-reverse;
      p {
        @apply pt-8;
        @screen lg {
          @apply pt-0 pl-8;
          max-width: 600px;
        }
      }
    }
  }
}
</style>