## Create example data

### Migrate database

```
  ./knex migrate:latest --env development
```
or using package manager (yarn/npm):

```
  yarn db:migrate
```
if you are using npm:
```
  npm run db:migrate
```
### Seed data

#### Run all seed
 After migrate, you can seed database via:
```
npx ts-node mock/seeds/seeder.ts
```
or using package manager (yarn/npm):

```
  yarn db:seed
```
if you are using npm:
```
  npm run db:seed
```