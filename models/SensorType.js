import {Model} from '@vuex-orm/core';
import Sensor from './Sensor';

export default class SensorType extends Model {
    static entity = 'sensorTypes';
    static primaryKey = 'code';

    static fields() {
        return {
            code: this.attr(''),
            name: this.attr(null),
            suffix: this.attr(''),
            sensors: this.hasMany(Sensor, 'type', 'code')
        }
    }
};
