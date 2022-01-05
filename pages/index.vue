<template>
    <div>
        <v-row>
            <v-col cols="12">
                <ChartButtonAdd :disabled="charts.length > 3"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                v-for="(chart, chartIndex) in charts"
                :key="chartIndex"
                cols="12"
                md="6"
            >
                <v-card class="overflow-hidden">
                    <Chart :chart="chart"/>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
    import Chart from '@/components/chart/Chart';
    import ChartButtonAdd from '@/components/chart/ChartButtonAdd';

    export default {
        head: {
            title: 'Dashboard'
        },
        components: {
            Chart,
            ChartButtonAdd
        },
        computed: {
            charts() {
                return this.$store.$db().model('charts').query().with('sensors').get();
            }
        }
    }
</script>
