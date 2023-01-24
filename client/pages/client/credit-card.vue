<template>
  <div class="credit-content">
    <a class="download-qr-link" v-on:click="downloadQrCode"
      ><download-icon class="download-icon" />Télécharger votre code QR</a
    >
    <div class="images">
      <div class="card-images">
        <img
          src="~/assets/images/credit-card-front.jpeg"
          alt="credit card front"
          class="card-face-image"
        />
        <img
          src="~/assets/images/credit-card-back.jpeg"
          alt="credit card front"
          class="card-face-image"
        />
      </div>
      <img
        :src="getUserQrCodeRoute()"
        class="qr-code-image"
        alt="credit card front"
      />
    </div>
  </div>
</template>

<script>
import DownloadIcon from "../../components/icons/DownloadIcon.vue";
import { MEDIA_PROVIDER_URL } from "../../config";

export default {
  components: {
    DownloadIcon,
  },
  methods: {
    getUserQrCodeRoute() {
      return `${MEDIA_PROVIDER_URL}/qrcodes/${this.$store.state.client._id}.png`;
    },
    downloadQrCode() {
      function forceDownload(blob, filename) {
        var a = document.createElement("a");
        a.download = filename;
        a.href = blob;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }

      function downloadResource(url, filename) {
        if (!filename) filename = url.split("\\").pop().split("/").pop();
        fetch(url, {
          headers: new Headers({
            Origin: location.origin,
          }),
          mode: "cors",
        })
          .then((response) => response.blob())
          .then((blob) => {
            let blobUrl = window.URL.createObjectURL(blob);
            forceDownload(blobUrl, filename);
          })
          .catch((e) => console.error(e));
      }

      downloadResource(this.getUserQrCodeRoute(), "qrcode");
    },
  },
};
</script>

<style>
.download-icon {
  width: 20px;
  margin-right: 1em;
}

.download-qr-link {
  cursor: pointer;
  display: inline-flex;
  background-color: #fff7e0;
  color: #ffba00;
  padding: 0.5em 1em;
  margin-bottom: 1em;
  border-radius: 5px;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.1);
}

.credit-content {
  padding: 1em 2rem;
}

.images {
  align-items: center;
  display: flex;
  width: 100% !important;
  flex-wrap: wrap;
}

.card-images {
  margin-right: 1em;
}

.qr-code-image {
  width: 300px;
}

.card-face-image {
  display: block;
  width: 400px;
  margin-bottom: 1em;
  border-radius: 5px;
}
</style>
