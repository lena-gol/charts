<template>
    <v-row class="flex-nowrap">
        <v-col class="flex-grow-0 flex-shrink-0 py-0">
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
            >
                <template v-slot:activator="{ on }">
                    <div
                        :style="colorPickerStyles"
                        v-on="on"
                    />
                </template>
                <v-card>
                    <v-card-text class="pa-0">
                        <v-color-picker
                            :value="value.color"
                            hide-mode-switch
                            @input="updateSensor('color', $event)"
                        />
                    </v-card-text>
                </v-card>
            </v-menu>
        </v-col>
        <v-col
            class="flex-grow-1 flex-shrink-1 px-0 py-0"
            style="max-width: calc(100% - 128px)"
        >
            <v-select
                :value="value.code"
                :items="options"
                :rules="[v => !!v]"
                label="Sensor"
                outlined
                dense
                @input="updateSensor('code', $event)"
            />
        </v-col>
        <v-col class="flex-grow-0 flex-shrink-0 py-0">
            <v-btn
                class="error px-0"
                height="40"
                min-width="40"
                @click="removeSensor"
            >
                <v-icon>
                    mdi-trash-can-outline
                </v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'ChartInputSensor',
        props: {
            value: {
                type: Object,
                required: true
            },
            selectedValues: {
                type: Array,
                required: true
            },
            availableOptions: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                menu: false
            }
        },
        computed: {
            options() {
                return !this.selectedValues.length ?
                    this.availableOptions :
                    this.availableOptions.filter(option => !this.selectedValues.includes(option.value) || option.value === this.value.code);
            },
            colorPickerStyles() {
                return {
                    width: '40px',
                    height: '40px',
                    backgroundColor: this.value.color,
                    borderRadius: '4px',
                    cursor: 'pointer'
                }
            }
        },
        methods: {
            updateSensor(key, value) {
                this.$emit('input', {...this.value, [key]: value});
            },
            removeSensor() {
                this.$emit('delete');
            }
        }
    }
</script>
