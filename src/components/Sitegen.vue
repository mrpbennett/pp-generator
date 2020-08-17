<template>
  <div class="mt-12 p-4 flex">
    <div class="w-2/5 px-24">
      <v-form ref="creative-upload">
        <div>
          <h2 class="font-bold text-xl text-gray-500 mb-4">Enter a brand name:</h2>
          <v-text-field v-model="brand"></v-text-field>
        </div>
        <div>
          <h2 class="font-bold text-xl text-gray-500">Select a site to display</h2>
          <v-overflow-btn class="my-2" :items="sites" v-model="url" label="Select Site"></v-overflow-btn>
        </div>
        <div class="my-8">
          <h2 class="font-bold text-xl text-gray-500">Choose a creative as an image</h2>
          <input type="file" round class="my-4" @change="onFileChange" />
        </div>
        <div class="my-8">
          <h2 class="font-bold text-xl text-gray-500 mb-4">Upload a creative by a tag</h2>
          <v-textarea solo name="input-7-4" label="Paste your script here" v-model="tag"></v-textarea>
          <v-btn @click="uploadCreative">Upload Creative</v-btn>
        </div>
      </v-form>

      <div class="flex flex-col items-center justify-center py-12">
        <div class="creative-outer break-words pt-1 pb-4">
          <div id="creative-upload">
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
      <iframe v-bind:src="url" width="100%" height="1000" id="iframe"></iframe>
    </div>
  </div>

  <!-- <script src="https://tag.contextweb.com/TagPublish/getjs.aspx?action=VIEWAD&cwrun=200&cwadformat=728X90&cwpid=560884&cwwidth=728&cwheight=90&cwpnet=1&cwtagid=714180"></script> -->
</template>

<script>
  export default {
    data() {
      return {
        brand: "",
        headline: "",
        creative: "",
        tag: "",
        url: "",
        sites: ["https://www.independent.co.uk/", "https://www.cbsnews.com/"],
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
      uploadCreative() {
        const d = document.createElement("div");
        const tag = this.tag;
        d.innerHTML = tag;

        const creative = document.getElementById("creative-upload");
        creative.appendChild(d);
      },
    },
  };
</script>

<style>
  .creative-outer {
    position: absolute;
    top: 257px;
    right: 98px;
    background-color: white;
  }
</style>
