import createConnectionPool, {sql} from '@databases/pg';
import tables from '@databases/pg-typed';
import DatabaseSchema, {serializeValue} from './__generated__';

export {sql}

const db = createConnectionPool(process.env.DB_CONNECTION_STRING);
export default db;

const {users} = tables<DatabaseSchema>({
  serializeValue,
});
export {users};
