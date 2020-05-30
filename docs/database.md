## Create example data

### Migrate database
using package manager (yarn/npm):

```
  yarn db:migrate
```
if you are using npm:
```
  npm run db:migrate
```
or using binary
```
  ./knex migrate:latest --env development
```

### Seed data

#### Run all seed
 After migrate, you can seed database via:
 using package manager (yarn/npm):

```
  yarn db:seed
```
if you are using npm:
```
  npm run db:seed
```
or using npx
```
npx ts-node mock/seeds/seeder.ts
```