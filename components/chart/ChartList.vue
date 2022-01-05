<template>
    <v-row>
        <v-col cols="12" sm="12">
            <v-card>
                <v-data-table
                    :headers="chartTableHeaders"
                    :items="charts"
                    :hide-default-footer="true"
                    disable-pagination
                >
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon
                            class="ml-4"
                            small
                            @click="deleteChart(item.id)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'ChartList',
        props: {
            charts: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                chartTableHeaders: [
                    {text: "Chart name", value: "name", align: "start", sortable: false},
                    {text: "Actions", value: "actions", align: "right", sortable: false},
                ],
            }
        },
        methods: {
            deleteChart(id) {
                this.$emit('delete-chart', id);
            }
        }
    }
</script>
