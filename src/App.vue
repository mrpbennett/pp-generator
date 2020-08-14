<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <h3>PulsePoint Generator</h3>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="display_size">
                <v-btn>
                    Mobile
                </v-btn>

                <v-btn>
                    Desktop
                </v-btn>
            </v-btn-toggle>
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
