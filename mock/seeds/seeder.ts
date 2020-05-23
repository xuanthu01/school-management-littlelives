import * as Knex from "knex";
import * as async from "async";

import { seed as seedUser } from './addUsers';
import { seed as seedSchool } from './addSchools';
import { seed as seedClass } from './addClasses';
import { seed as seedTrack } from './addTrackings';
import { UserRole } from "../../src/auth/user.entity";

const databaseName = "school_management";
const migrationsDir = __dirname + "/mock/migrations";

const knex = Knex({
  client: "postgresql",
  connection: `postgres://postgres:abc123@localhost:5432/${databaseName}`,
  migrations: {
    directory: migrationsDir
  },
  seeds: {
    directory: "."
  },
});
function seedUsers(callback: Function) {
  seedUser(knex)
    .then(() => {
      return knex.table('user').select('id').where('role', '=', UserRole.SCHOOL_OWNER)
    })
    .then(users => {
      const schoolOwnerIds = users.map((user) => user.id);
      callback(null, schoolOwnerIds);
    })
    .catch(err => callback(err, []));

}
function seedSchools(ownerIds: [number], callback: Function) {
  seedSchool(knex, ownerIds)
    .then(() => {
      return knex.table("school").select('id')
    })
    .then(async schools => {
      const schoolIds: number[] = schools.map(school => school.id);
      const teachers = await knex.table("user").select('id').where('role', '=', UserRole.SCHOOL_TEACHER);
      const teacherIds = teachers.map(teacher => teacher.id);
      callback(null, teacherIds, schoolIds);
    })
    .catch(err => {
      console.log(err);
    })
}
function seedClasses(teacherIds: number[], schoolIds: number[], callback: Function) {
  seedClass(knex, teacherIds, schoolIds)
    .then(() => {
      return knex.table("class").select('id')
    })
    .then(classes => {
      const classIds = classes.map(c => c.id);
      callback(null, classIds);
    })
    .catch(err => callback(err))
}
function seedTrackings(classIds: number[], callback: Function) {
  seedTrack(knex, classIds).then(() => {
    console.log("Seed Done");
    callback(null);
  })
}
export async function runSeed(): Promise<void> {
  async.waterfall([
    seedUsers,
    seedSchools,
    seedClasses,
    seedTrackings
  ], (err, results) => {
    console.log("results", results)
    //seed class
    process.exit(0)
  })
}
runSeed();