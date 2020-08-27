<template>
  <div class="mt-12">
    <div class="w-full px-24 flex">
      <div class="mr-6 w-1/5">
        <v-text-field v-model="brand" solo label="Enter Brand Name"></v-text-field>
        <v-text-field v-model="url" solo label="Enter a URL"></v-text-field>
        <input type="file" round class="my-4" @change="onFileChange" />
      </div>
      <!-- <div>
          <v-textarea
            solo
            name="input-7-7"
            label="Paste your script here"
            v-model="tag"
          ></v-textarea>
      </div>-->
      <div>
        <div class="mb-12">
          <v-btn-toggle>
            <v-btn @click="mobileDisplay">Mobile</v-btn>
            <v-btn @click="desktopDisplay">Desktop</v-btn>
          </v-btn-toggle>
        </div>
        <div>
          <v-btn @click="screenshot" color="primary" class="mr-4">Take screenshot</v-btn>

          <v-btn @click="uploadCreative" color="primary" disabled>insert Creative from tag</v-btn>

          <v-btn @click="replaceAds" color="primary">Replace Ads</v-btn>
        </div>

        <div>
          <v-checkbox
            v-model="adsizes.skyscrapper"
            :label="`160x600: ${adsizes.skyscrapper.toString()}`"
          ></v-checkbox>
          <v-checkbox v-model="adsizes.mpu" :label="`MPU: ${adsizes.mpu.toString()}`"></v-checkbox>
          <v-checkbox
            v-model="adsizes.doublempu"
            :label="`Double MPU: ${adsizes.doublempu.toString()}`"
          ></v-checkbox>
          <v-checkbox
            v-model="adsizes.leaderboard"
            :label="`728x90: ${adsizes.leaderboard.toString()}`"
          ></v-checkbox>
          <v-checkbox
            v-model="adsizes.mobLeaderboard"
            :label="`300x50: ${adsizes.mobLeaderboard.toString()}`"
          ></v-checkbox>
          <v-checkbox
            v-model="adsizes.mobLeaderboard2"
            :label="`320x50: ${adsizes.mobLeaderboard2.toString()}`"
          ></v-checkbox>
        </div>
      </div>
    </div>

    <div class="w-full mt-24 sticky">
      <div class="laptop-lg block ml-auto mr-auto" id="wrapper">
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

        <iframe
          v-bind:src="`http://${url}.${domainSuffix}`"
          width="100%"
          height="1000"
          id="iframe"
          class="border shadow rounded"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
  import html2canvas from "html2canvas";
  import { saveAs } from "file-saver";

  export default {
    data() {
      return {
        brand: "",
        headline: "",
        creative: "",
        tag: "",
        url: "",
        domainSuffix: "proxy.localhost:9999",
        draggable: {
          active: false,
          currentX: null,
          currentY: null,
          initialX: null,
          initialY: null,
          xOffset: 0,
          yOffset: 0,
        },
        adsizes: {
          skyscrapper: false, // 160x600
          mpu: false, // 300x250
          doublempu: false, // 300x600
          leaderboard: false, //728x90
          mobLeaderboard: false, // 300x50
          mobLeaderboard2: false, // 320x50
        },
      };
    },

    computed: {
      dragItem() {
        return document.getElementById("creative");
      },
      container() {
        return document.getElementById("wrapper");
      },
    },
    mounted() {
      this.container.addEventListener("mousedown", this.dragStart, false);
      this.container.addEventListener("mouseup", this.dragEnd, false);
      this.container.addEventListener("mousemove", this.drag, false);
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
      dragStart(e) {
        if (e.type === "mousedown") {
          console.log("drag started");
          this.draggable.initialX = e.clientX - this.draggable.xOffset;
          this.draggable.initialY = e.clientY - this.draggable.yOffset;
          console.log(this.draggable.active);

          this.draggable.active = true;
        }
      },
      dragEnd(e) {
        if (e.type === "mouseup") {
          console.log("drag ended");
          this.draggable.initialX = this.draggable.currentX;
          this.draggable.initialY = this.draggable.currentY;

          this.draggable.active = false;
          console.log(this.draggable.active);
        }
      },
      drag(e) {
        if (this.draggable.active) {
          console.log("draggggg" + this.draggable.active);
          e.preventDefault();

          if (e.type === "mousemove") {
            this.draggable.currentX = e.clientX - this.draggable.initialX;
            this.draggable.currentY = e.clientY - this.draggable.initialY;
          }

          this.draggable.xOffset = this.draggable.currentX;
          this.draggable.yOffset = this.draggable.currentY;

          this.setTranslate(
            this.draggable.currentX,
            this.draggable.currentY,
            this.dragItem
          );
        }
      },
      setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
      },
      mobileDisplay() {
        const el = document.getElementById("wrapper");
        el.classList.add("mobile-lg");
        el.classList.remove("laptop-lg");
      },
      desktopDisplay() {
        const el = document.getElementById("wrapper");
        el.classList.add("laptop-lg");
        el.classList.remove("mobile-lg");
      },
      screenshot() {
        if (html2canvas || saveAs) {
          //donothing
        }
        const w = document.getElementById("iframe").contentWindow;
        const d = w.document;
        const s = d.createElement("script");
        s.src =
          "https://gist.githubusercontent.com/CrandellWS/6bc2078aced496004d7a045e6360f19b/raw/9ae761864bbc67bc7298814bff703a4a6baaf709/html2canvas.js";
        const ss = () => {
          w.origin = window.origin;
          w.html2canvas(d.body)
            .then((canvas) => {
              var a = d.createElement("a");
              a.href = canvas
                .toDataURL("image/jpeg")
                .replace("image/jpeg", "image/octet-stream");
              a.download = "screenshot.jpg";
              a.click();
            })
            .catch((e) => alert(e));
        };
        s.onload = ss;
        d.body.appendChild(s);
      },
      replaceAds() {
        const potentialAds = Array.from(
          document
            .getElementById("iframe")
            .contentWindow.document.querySelectorAll("div,iframe")
        );
        for (let i = 0; i < potentialAds.length; i++) {
          const e = potentialAds[i];
          if (
            e.clientWidth == 1260 &&
            (e.clientHeight == 250 || e.clientHeight == 90)
          ) {
            const d = document.createElement("div");
            d.style = e.style;
            // d.style='border: solid black 1px; width:728px; height:90px;'
            d.style["border"] = "solid black 1px";
            d.innerHTML = "LOL this is an ad";
            e.parentNode.replaceChild(d, e);
            break;
          }
        }
      },
    },
  };
</script>

<style>
  #creative {
    position: absolute;
  }

  #creative:hover {
    border: 2px solid red;
    cursor: pointer;
  }
  .mobile-lg {
    width: 425px !important;
  }
  .laptop {
    width: 1024px;
  }
  .laptop-lg {
    width: 1440px;
  }
</style>
