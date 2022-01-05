<template>
    <v-card class="px-5 py-4">
        <v-card-title class="pa-0 mb-4">Create chart</v-card-title>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
                v-model="chartName"
                :rules="[v => !!v]"
                label="Chart name"
                outlined
                dense
                required
                autocomplete="off"
            />
            <v-radio-group
                v-model="chartType"
                :rules="[v => !!v]"
                label="Chart type"
                class="mt-1"
                row
                required
            >
                <v-radio
                    label="Line"
                    value="line"
                />
                <v-radio
                    label="Bar"
                    value="bar"
                />
            </v-radio-group>
            <v-select
                v-model="selectedSensorTypes"
                :rules="[v => v.length > 0]"
                :items="sensorTypes"
                label="Sensor Types (no more than two)"
                class="mt-4"
                outlined
                dense
                multiple
                required
                v-on:input="sensorTypeSelect"
            />
            <div v-if="selectedSensors.length" class="mt-3 mb-5">
                <template v-for="(sensor, sensorIndex) in selectedSensors">
                    <ChartInputSensor
                        :key="sensorIndex"
                        v-model="selectedSensors[sensorIndex]"
                        :available-options="availableSensorsOptions"
                        :selected-values="selectedSensorsCodes"
                        @delete="removeSensor(sensorIndex)"
                    />
                </template>
            </div>
            <v-btn
                v-if="availableSensorsOptions.length && availableSensorsOptions.length > selectedSensors.length"
                @click="addSensor"
                class="primary mb-4"
            >
                Add sensor
            </v-btn>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    :disabled="!valid || !selectedSensors.length"
                    class="px-4"
                    color="primary"
                    @click="validate"
                >
                    <v-progress-circular
                        v-if="loading"
                        class="mr-2"
                        indeterminate
                        :size="20"
                        :width="2"
                        color="white"
                    />
                    Create
                </v-btn>
                <v-btn
                    class="px-4"
                    @click="reset"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    import ChartInputSensor from '@/components/chart/ChartInputSensor';

    export default {
        name: 'ChartForm',
        components: {
            ChartInputSensor
        },
        data: () => ({
            loading: false,
            valid: true,
            chartName: '',
            chartType: null,
            selectedSensorTypes: [],
            selectedSensors: []
        }),
        computed: {
            sensorTypes() {
                return this.$store.$db().model('sensorTypes').all().map(type => ({
                    text: type.name,
                    value: type.code
                }));
            },
            sensorsList() {
                return this.$store.$db().model('sensors').all();
            },
            availableSensorsList() {
                return this.sensorsList.filter(sensor => this.selectedSensorTypes.includes(sensor.type));
            },
            availableSensorsOptions() {
                return this.availableSensorsList.map(sensor => ({text: sensor.name, value: sensor.code}));
            },
            selectedSensorsCodes() {
                return this.selectedSensors.filter(sensor => !!sensor.code).map(sensor => sensor.code);
            }
        },
        methods: {
            validate() {
                if (!this.$refs.form.validate() || !this.selectedSensors.length) {
                    return;
                }

                this.loading = true;

                this.$axios.get('sensors/values', {
                    params: {
                        sensors: this.selectedSensors.map(sensor => sensor.code),
                    }
                })
                    .then((res) => {
                        const self = this;
                        const sensorsValues = res.data.sensorsValues;

                        const chartSensors = this.selectedSensors.map(sensor => ({
                            code: sensor.code,
                            pivot: {
                                code: sensor.code,
                                color: sensor.color,
                                values: sensorsValues.find(s => s.code === sensor.code).values
                            }
                        }));

                        this.$store.$db().model('charts').insert({
                            data: {
                                name: this.chartName,
                                type: this.chartType,
                                sensors: chartSensors
                            },
                            update: ['sensors', 'sensorTypes'],
                            insert: ['chartSensors']
                        }).then((entities) => {
                            self.loading = false;
                            self.reset();
                        });
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            },
            reset() {
                this.closeModal();
                this.clearForm();
            },
            closeModal() {
                this.$emit('close-modal');
            },
            clearForm() {
                if (this.$refs.form) {
                    this.$refs.form.reset();
                }
                this.selectedSensorTypes = [];
                this.selectedSensors = [];
            },
            sensorTypeSelect(e) {
                if (e.length > 2) {
                    e.pop();
                }
                const availableSensorsCodes = this.availableSensorsList.map(sensor => sensor.code);
                this.selectedSensors = this.selectedSensors.filter(sensor => availableSensorsCodes.includes(sensor.code));
            },
            addSensor() {
                this.selectedSensors.push({
                    code: null,
                    color: '#003E7B'
                });
            },
            removeSensor(index) {
                this.selectedSensors.splice(index, 1);
            }
        }
    }
</script>
