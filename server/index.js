const server = require("./src/server");

// Una vez que la DB esté bien configurada, descomentamos esta la siguiente linea
//const { conn } = require("./src/db_connection");

const PORT = 3001;

//Y descomentamos esta configuración

//conn.sync({ force: false })
// .then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  // });
});
//.catch((error) => console.error(error));
