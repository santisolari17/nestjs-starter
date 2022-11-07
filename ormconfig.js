const dbConfig = {
  keepConnectionAlive: true,
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

const environments = {
  test: 'test',
  development: 'development',
  production: 'production',
};

function setDbCOnfigByEnvironment(environment) {
  const switchFn = (key) => {
    const cases = {
      [environments.test]: () => {
        Object.assign(dbConfig, {
          type: 'sqlite',
          database: 'db.test.sqlite',
          entities: ['**/*.entity.ts'],
          migrationsRun: true,
        });
      },
      [environments.development]: () => {
        Object.assign(dbConfig, {
          type: 'sqlite',
          database: 'db.sqlite',
          entities: ['**/*.entity.js'],
        });
      },
      [environments.production]: () => {
        Object.assign(dbConfig, {
          type: 'postgres',
          url: process.env.DATABASE_URL,
          migrationsRun: true,
          entities: ['**/*.entity.js'],
          ssl: {
            recjectUnauthorized: false,
          },
        });
      },
      default: () => {
        throw new Error(`Error at dbConfig setup: unknown environment [${environment}]`);
      },
    };

    return (cases[key] || cases['default'])();
  };

  return switchFn(environment);
}

setDbCOnfigByEnvironment(process.env.NODE_ENV);
console.log('QUELELEE -> ', dbConfig.database);
module.exports = dbConfig;
