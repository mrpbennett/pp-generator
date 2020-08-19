<template>
  <div class="flex mt-12" id="wrapper">
    <div class="w-4/12 px-24">
      <v-form ref="creative-upload">
        <div>
          <h2 class="font-bold text-xl text-gray-500 mb-4">
            Enter a brand name:
          </h2>
          <v-text-field v-model="brand"></v-text-field>
        </div>
        <div>
          <h2 class="font-bold text-xl text-gray-500">
            Select a site to display
          </h2>
          <v-text-field v-model="url"></v-text-field>
        </div>
        <div class="my-8">
          <h2 class="font-bold text-xl text-gray-500">
            Choose a creative as an image
          </h2>
          <input type="file" round class="my-4" @change="onFileChange" />
        </div>
        <div class="my-8">
          <h2 class="font-bold text-xl text-gray-500 mb-4">
            Upload a creative by a tag
          </h2>
          <v-textarea
            solo
            name="input-7-4"
            label="Paste your script here"
            v-model="tag"
          ></v-textarea>
          <!-- <v-btn @click="uploadCreative" class="mr-4">Upload Creative</v-btn> -->
          <!-- <v-btn @click="screenshot">Take screenshot</v-btn> -->
        </div>
      </v-form>
    </div>

    <div id="creative">
      <img :src="creative" />

      <div class="text-left mt-2">
        <h6 class="font-bold">{{ headline }}</h6>
        <span class="text-sm text-gray-600">
          Ads by
          <span class="text-red-800">{{ brand }}</span>
        </span>
      </div>
    </div>

    <div class="w-8/12 mx-4">
      <iframe
        v-bind:src="`https://www.${url}`"
        width="100%"
        height="1000"
        id="iframe"
      ></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        brand: '',
        headline: '',
        creative: '',
        tag: '',
        url: '',
      };
    },
    mounted: {
      scrollIframe() {
        this.iframe.contentWindow.scollto({
          top: 267,
          right: 98,
          behavior: 'smooth',
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
        const d = document.createElement('div');
        const tag = this.tag;
        d.innerHTML = tag;

        const creative = document.getElementById('creative-upload');
        creative.appendChild(d);
      },
    },
  };
</script>

<style>
  #creative {
    position: absolute;
    bottom: 0;
    left: 190;
  }

  #creative:hover {
    border: 5px solid white;
    cursor: pointer;
  }
</style>
