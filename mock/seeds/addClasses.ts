import * as Knex from "knex";
import * as faker from "faker";
import { getRandomEl } from "../utils";

const createFakeClass = (teacher_id: number, school_id: number) => {
  return {
    name: faker.company.bsBuzz(),
    teacher_id,
    school_id,
    year: faker.date.past()
  }
}

export async function seed(knex: Knex, teacherIds: number[], schoolIds: number[]): Promise<any> {
  await knex("class").del()
  const desiredFakes = 50;
  const fakesClass = [];
  for (let i = 0; i < desiredFakes; i++) {
    const teacher_id = teacherIds[getRandomEl(teacherIds.length)];
    const school_id = schoolIds[getRandomEl(schoolIds.length)];
    fakesClass.push(createFakeClass(teacher_id, school_id));
  }
  await knex('class').insert(fakesClass);
};
