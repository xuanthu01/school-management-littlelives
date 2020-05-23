import * as Knex from "knex";

// id, child_name, class_id, time_check_in, time_check_out
export async function up(knex: Knex): Promise<any> {
  if (!(await knex.schema.hasTable('tracking')))
    await knex.schema.createTable("tracking", t => {
      t
        .increments('id')
        .primary();

      t
        .string('child_name')
        .notNullable()

      t
        .integer('class_id')
        .references('class.id')
        .onDelete('cascade')
        .onUpdate('cascade')
        .notNullable()

      t
        .dateTime('time_check_in')
        .defaultTo(null)

      t
        .dateTime('time_check_out')
        .defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('tracking');
}

