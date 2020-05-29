import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  const isExisting = await knex.schema.hasTable('class');
  if (!isExisting) {
    await knex.schema.createTable("class", t => {
      t
        .increments('id')
        .unsigned()
        .primary()

      t.string("name");

      t.string("year");

      t
        .integer("teacherIdId")
        .references('user.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()

      t
        .integer("schoolIdId")
        .references('school.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
    })
  }

}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('class');
}

