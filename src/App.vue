<template>
  <v-app>
    <v-app-bar app color="indigo darken-2" dark>
      <h3>PulsePoint Generator</h3>
    </v-app-bar>

    <v-main>
      <v-sitegen />
    </v-main>
  </v-app>
</template>

<script>
  import SiteGenerator from './components/Sitegen';
  export default {
    name: 'App',

    components: {
      'v-sitegen': SiteGenerator,
    },

    data: () => ({
      display_size: null,
    }),
  };
</script>
