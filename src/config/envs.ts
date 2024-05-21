let entities = ["./dist/src/db/entities/**/*.{ts,js}"];
let migrations = ["./dist/src/db/migrations/**/*.{ts,js}"];
let synchronize = true;
let ssl = {};

if (process.env.ENVIRONMENT === "production") {
  entities = ["./dist/src/db/entities/**/*.{ts,js}"];
  migrations = ["./dist/src/db/migrations/**/*.{ts,js}"];
  synchronize = false;
  ssl = {
    rejectUnauthorized: false,
  };
}

export { entities, migrations, synchronize, ssl };
