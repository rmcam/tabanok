const { Client } = require('pg');

const connectionString =
  'PGPASSWORD=a0Y4uR5PCwuhnsS1tKvry8Jx5BmD7Mlj psql -h dpg-cvour9q4d50c73bmalng-a.oregon-postgres.render.com -U admin tabanok_db';

async function main() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    const res = await client.query(
      'SELECT "wordKamentsa", "wordSpanish", pronunciation, "culturalContext" FROM vocabulary LIMIT 10;',
    );
    console.log('Resultados:');
    res.rows.forEach((row) => {
      console.log(row);
    });
  } catch (err) {
    console.error('Error ejecutando la consulta:', err);
  } finally {
    await client.end();
  }
}

main();
