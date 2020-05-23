import * as Knex from "knex";
import { UserRole } from "../../src/auth/user.entity";


export async function up(knex: Knex): Promise<any> {
  try {
    const isExisting = await knex.schema.hasTable('user');
    if (!isExisting)
      await knex.schema.createTable("user", table => {
        table
          .increments('id')
          .unsigned()
          .primary();

        table
          .string('username')
          .unique()
          .notNullable();

        table
          .enum('role', [UserRole.HQ, UserRole.SCHOOL_OWNER, UserRole.SCHOOL_TEACHER, UserRole.USER])
          .defaultTo(UserRole.USER);

        table
          .string('password')
          .notNullable();

        table
          .string('salt')
          .notNullable();
      })
  } catch (error) {
    console.log(error);
  }
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('user');
}

