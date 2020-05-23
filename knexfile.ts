const databaseName = "school_management";
const migrationsDir = __dirname + "/mock/migrations";
console.log("migrationsDir", migrationsDir)
module.exports = {
  development: {
    client: "postgresql",
    connection: `postgres://postgres:abc123@localhost:5432/${databaseName}`,
    migrations: {
      directory: migrationsDir
    },
    seeds: {
      directory: __dirname + "/mock/seeds"
    },
  }
}