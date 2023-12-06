import {createPool} from 'mysql2/promise';

const connect2 = createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: 3306,
  database: 'trabajos_realizados',
})

export {connect2};