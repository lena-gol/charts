<template>
    <v-app>
        <AppHeader/>
        <v-main class="grey lighten-3 mt-4">
            <v-container>
                <Nuxt/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import SensorType from '@/models/SensorType';
    import AppHeader from '@/components/common/AppHeader';

    export default {
        components: {
            AppHeader
        },
        async fetch() {
            await SensorType.api().get('sensors');
        }
    }
</script>
