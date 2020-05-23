## Create example data

### Migrate database

```
  ./knex migrate:latest --env development
```

### Seed data

#### Run all seed
 After migrate, you can seed database via:
```
npx ts-node mock/seeds/seeder.ts
```