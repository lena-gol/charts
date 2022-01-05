<template>
    <div>
        <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
        </h1>
        <h1 v-else>
            {{ otherError }}
        </h1>
        <NuxtLink to="/" class="text-decoration-none">
            Home page
        </NuxtLink>
    </div>
</template>

<script>
    export default {
        layout: 'empty',
        props: {
            error: {
                type: Object,
                required: false,
                default: null
            }
        },
        data() {
            return {
                pageNotFound: '404 Not Found',
                otherError: 'An error occurred'
            }
        },
        head() {
            const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
            return {title};
        }
    }
</script>
