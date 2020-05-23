import * as Knex from "knex";
import * as faker from "faker";
import { getRandomEl } from "../utils";

const createFakeTrack = (class_id: string | number) => {
  const dateTime = faker.date.past();
  const time_check_in = dateTime.toISOString().replace('Z', '').replace('T', ' ');
  const fourHoursAfter = new Date(dateTime.setHours(dateTime.getHours() + 4))
  const time_check_out = fourHoursAfter.toISOString().replace('Z', '').replace('T', ' ');
  return {
    child_name: faker.name.firstName() + " " + faker.name.lastName(),
    class_id,
    time_check_in,
    time_check_out
  }
}

export async function seed(knex: Knex, classIds: number[]): Promise<any> {
  await knex('tracking').del();
  const desiredFakes = 50;
  const fakesTrack = [];
  for (let i = 0; i < desiredFakes; i++) {
    const class_id = classIds[getRandomEl(classIds.length)];
    const tr = createFakeTrack(class_id);
    fakesTrack.push(tr);
  }
  await knex('tracking').insert(fakesTrack);
};
