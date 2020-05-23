import * as Knex from "knex";
import { payment_types } from "../utils";
import { PaymentType } from "../../src/school/school.entity";

export async function up(knex: Knex): Promise<any> {
  try {
    const isExisting = await knex.schema.hasTable('school');
    if (!isExisting)
      await knex.schema.createTable("school", table => {
        table
          .increments('id')
          .unsigned()
          .primary();

        table
          .string('name')
          .notNullable();

        table
          .integer('parent_id')
          .references('school.id')
          .nullable()
          .onUpdate('CASCADE')
          .onDelete('CASCADE')

        table
          .enum('payment_type', payment_types)
          .defaultTo(PaymentType.FREE)
          .notNullable();

        table
          .integer('owner_id')
          .references('user.id')
          .notNullable()
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
  } catch (error) {
    console.log(error);
  }

}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('school');
}

