<template>
    <div>
        <highcharts
            :constructor-type="'stockChart'"
            :options="chartOptions"
        />
    </div>
</template>
<script>
    export default {
        name: 'Chart',
        props: {
            chart: {
                type: Object,
                required: true
            }
        },
        computed: {
            sensorsTypesCodes() {
                return [...new Set(this.chart.sensors.map(sensor => sensor.type))];
            },
            sensorsTypes() {
                return this.$store.$db().model('sensorTypes').query().whereIdIn(this.sensorsTypesCodes).limit(2).get();
            },
            chartOptions() {
                const yAxis = this.sensorsTypes.map((type, index) => {
                    return {
                        title: {
                            text: type.name
                        },
                        labels: {
                            format: '{value}' + type.suffix
                        },
                        opposite: !index
                    };
                });

                const series = [];
                this.chart.sensors.forEach(sensor => {
                    if (!this.sensorsTypesCodes.includes(sensor.type)) {
                        return;
                    }
                    const seriesItem = {
                        name: sensor.name,
                        type: this.chart.type === 'bar' ? 'column' : 'line',
                        color: sensor.details(this.chart.id).color,
                        data: sensor.details(this.chart.id).values,
                        dataGrouping: {
                            approximation: 'average'
                        },
                        tooltip: {
                            valueSuffix: sensor.suffix(sensor.type),
                            valueDecimals: 0
                        }
                    };
                    if (this.sensorsTypesCodes.indexOf(sensor.type) === 1) {
                        seriesItem.yAxis = 1;
                    }
                    series.push(seriesItem);
                });

                return {
                    title: {
                        text: this.chart.name
                    },
                    legend: {
                        enabled: true
                    },
                    rangeSelector: {
                        selected: 0,
                        buttons: [
                            {
                                type: 'day',
                                count: 1,
                                text: 'Day'
                            },
                            {
                                type: 'all',
                                text: 'All'
                            }
                        ],
                        inputStyle: {
                            backgroundColor: '#FFFFFF',
                            color: '#333333',
                            fontWeight: 'bold'
                        }
                    },
                    yAxis: yAxis,
                    series: series
                };
            }
        }
    }
</script>
