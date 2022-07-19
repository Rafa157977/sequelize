const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sequelize', 'root', '1234', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

module.exports.getUser = async function() {

  try {
    await sequelize.authenticate();
    console.log("Connected!");
    const [results, metadata] =  await sequelize.query('SELECT * FROM user');
    return results;
  } catch (err) {
    console.log("Can't connect to database!");
  }

}

/*
async function testConnection(){
  
};

testConnection();
*/
/*
sequelize.authenticate().then(() => {
  console.log("Connected to database!");
}).catch(() => {
  console.log("Could not connected!");
})
*/
// Option 1: Passing a connection URI
//const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
/*
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});
*/
// Option 3: Passing parameters separately (other dialects)
/*
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
//});