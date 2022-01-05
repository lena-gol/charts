import {Model} from '@vuex-orm/core';
import ChartSensor from './ChartSensor';
import SensorType from './SensorType';

export default class Sensor extends Model {
    static entity = 'sensors';
    static primaryKey = 'code';

    static fields() {
        return {
            code: this.attr(''),
            name: this.attr(''),
            type: this.attr(null)
        }
    }

    details(chartId) {
        return ChartSensor.find([this.code, chartId]);
    }

    suffix(typeCode) {
        return SensorType.find(typeCode).suffix;
    }
};
