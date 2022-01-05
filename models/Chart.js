import {Model} from '@vuex-orm/core';
import Sensor from './Sensor';
import ChartSensor from './ChartSensor';

export default class Chart extends Model {
    static entity = 'charts';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.uid(),
            name: this.attr(null),
            type: this.attr('line'),
            sensors: this.belongsToMany(Sensor, ChartSensor, 'chart_id', 'sensor_code')
        }
    }
};
