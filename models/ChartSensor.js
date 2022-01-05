import {Model} from '@vuex-orm/core';

export default class ChartSensor extends Model {
    static entity = 'chartSensors';
    static primaryKey = ['sensor_code', 'chart_id'];

    static fields() {
        return {
            chart_id: this.attr(null),
            sensor_code: this.attr(null),
            color: this.attr('#003E7B'),
            values: this.attr('[]')
        }
    }
};
