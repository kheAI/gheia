import snowflake from 'snowflake-sdk';
import { v4 as uuidv4 } from 'uuid';

export async function insertSensorReading(nodeId: string, payload: any) {
  if (!process.env.SNOWFLAKE_ACCOUNT || !process.env.SNOWFLAKE_USERNAME || !process.env.SNOWFLAKE_PASSWORD) {
    console.warn('[Snowflake] Skipped insert: SNOWFLAKE credentials missing in .env');
    return;
  }

  return new Promise((resolve, reject) => {
    console.log('[Snowflake] Initiating connection to warehouse...');
    const connection = snowflake.createConnection({
      account: process.env.SNOWFLAKE_ACCOUNT!,
      username: process.env.SNOWFLAKE_USERNAME!,
      password: process.env.SNOWFLAKE_PASSWORD!,
      warehouse: process.env.SNOWFLAKE_WAREHOUSE,   // e.g. COMPUTE_WH
      database: process.env.SNOWFLAKE_DATABASE,     // e.g. IOT_DB
      schema: process.env.SNOWFLAKE_SCHEMA || 'PUBLIC',
      clientSessionKeepAlive: false
    });

    connection.connect((err, conn) => {
      if (err) {
        console.error('[Snowflake] Connection failed:', err);
        return reject(err);
      }

      // Store the raw JSON alongside extracted identifier in an unstructured/semi-structured data lake pattern
      const sql = `INSERT INTO SENSOR_READINGS (ID, NODE_ID, PAYLOAD, CREATED_AT) 
                   SELECT ?, ?, PARSE_JSON(?), CURRENT_TIMESTAMP()`;
      
      connection.execute({
        sqlText: sql,
        binds: [uuidv4(), nodeId, JSON.stringify(payload)],
        complete: (err, stmt, rows) => {
          if (err) {
            console.error('[Snowflake] Insert error:', err);
            reject(err);
          } else {
            console.log(`[Snowflake] Successfully archived reading for ${nodeId} into data lake.`);
            resolve(rows);
          }
          
          // Cleanup connection
          connection.destroy((destroyErr) => {
            if (destroyErr) console.error('[Snowflake] Disconnect error', destroyErr);
          });
        }
      });
    });
  });
}
