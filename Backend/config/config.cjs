module.exports = {
  development: {
    username: "postgres",           
    password: "170905",       
    database: "riwas_db",           
    host: "127.0.0.1",            
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "170905",
    database: "riwas_test",         
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "170905",
    database: "riwas_prod",         
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
