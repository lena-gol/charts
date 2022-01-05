<template>
    <div>
        <ChartList
            :charts="charts"
            @delete-chart="deleteChart"
        />
    </div>
</template>

<script>
    import ChartList from '@/components/chart/ChartList';

    export default {
        head: {
            title: 'Settings'
        },
        components: {
            ChartList
        },
        computed: {
            Chart() {
                return this.$store.$db().model('charts');
            },
            charts() {
                return this.Chart.all();
            }
        },
        methods: {
            deleteChart(id) {
                this.Chart.delete(id);
            }
        }
    }
</script>
