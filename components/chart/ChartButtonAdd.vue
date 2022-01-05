<template>
    <div>
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="green lighten-2"
                    :dark="!disabled"
                    :disabled="disabled"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon left dark>
                        mdi-plus
                    </v-icon>
                    Add chart
                </v-btn>
            </template>
            <ChartForm @close-modal="dialog = false"/>
        </v-dialog>
    </div>
</template>

<script>
    import ChartForm from '@/components/chart/ChartForm';

    export default {
        name: 'ChartButtonAdd',
        components: {
            ChartForm
        },
        props: {
            disabled: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                dialog: false
            }
        },
    }
</script>
