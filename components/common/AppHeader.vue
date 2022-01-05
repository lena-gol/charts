<template>
    <v-app-bar app color="white">
        <v-container class="py-0 fill-height">
            <v-btn
                v-for="(menuItem, menuItemIndex) in menu"
                :key="menuItemIndex"
                :to="menuItem.link"
                nuxt
                elevation="0"
                class="mr-2 white"
            >
                {{ menuItem.text }}
            </v-btn>
        </v-container>
    </v-app-bar>
</template>

<script>
    export default {
        name: 'AppHeader',
        data: () => ({
            menu: [
                {
                    text: 'Dashboard',
                    link: '/',
                },
                {
                    text: 'Settings',
                    link: '/settings'
                }
            ],
        }),
    }
</script>
