import {Database} from '@vuex-orm/core';
import Sensor from '@/models/Sensor';
import SensorType from '@/models/SensorType';
import Chart from '@/models/Chart';
import ChartSensor from '@/models/ChartSensor';

const database = new Database();

database.register(Sensor);
database.register(SensorType);
database.register(Chart);
database.register(ChartSensor);

export default database;
