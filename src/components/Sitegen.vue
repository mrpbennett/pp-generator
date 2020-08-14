<template>
  <div class="mt-12 p-4 flex">
    <div class="w-2/5 px-24">
      <v-form ref="creative-upload">
        <v-text-field :rules="nameRules" v-model="brand" label="Brand Name" required></v-text-field>
        <!-- <v-text-field v-model="headline" :rules="nameRules" label="Headline" required></v-text-field> -->
        <input type="file" round class="my-4" @change="onFileChange" />
        <!-- <v-btn color="blue-grey" class="ma-2 white--text" @click="applyCreative">
          <v-icon left dark>mdi-cloud-upload</v-icon>upload creative
        </v-btn>-->
      </v-form>

      <div class="flex flex-col items-center justify-center border py-12">
        <div class="creative-outer break-words pt-1 pb-4">
          <div>
            <img :src="creative" />
          </div>
          <div class="text-left mt-2">
            <h6 class="font-bold">{{ headline }}</h6>
            <span class="text-sm text-gray-600">
              Ads by
              <span class="text-red-800">{{ brand }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-3/5">
      <iframe src="https://www.independent.co.uk/" width="100%" height="1000" id="iframe"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        brand: "",
        headline: "",
        creative: "",
        iframe: document.getElementById("iframe"),
      };
    },
    mounted: {
      scrollIframe() {
        this.iframe.contentWindow.scollto({
          top: 267,
          right: 98,
          behavior: "smooth",
        });
      },
    },
    methods: {
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        this.createImage(files[0]);
      },
      createImage(file) {
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.creative = e.target.result;
        };
        reader.readAsDataURL(file);
      },
    },
  };
</script>

<style>
  .creative-outer {
    position: absolute;
    top: 267px;
    right: 98px;
    background-color: white;
  }
</style>
