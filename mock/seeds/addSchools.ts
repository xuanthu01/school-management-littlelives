import * as Knex from "knex";
import * as faker from "faker";
import * as async from "async";
import { getRandomEl, payment_types } from "../utils";

const createFakeSchool = (
  parent_id: string | number,
  owner_id: string | number
) => {
  return {
    name: faker.company.companyName(),
    parent_id,
    payment_type: payment_types[getRandomEl(2)],
    owner_id
  }
}
const createParentSchool = (ower: string | number) => createFakeSchool(null, ower);

export async function seed(knex: Knex, userIds: [number]): Promise<any> {
  await knex('school').del();
  const desiredFakes = 50;
  const fakeSchool = [];

  const desiredParentSchool = 10;
  const parentSchool = [];
  for (let i = 0; i < desiredParentSchool; i++) {
    const ower = userIds[getRandomEl(userIds.length)];
    parentSchool.push(createParentSchool(ower));
  }
  await knex('school').insert(parentSchool).then(async () => {
    console.log("seed parentSchool complete");
    const schools = await knex('school').select('id');
    const parentSchoolIds = [...schools, { id: null }].map(school => school.id);
    for (let i = 0; i < desiredFakes; i++) {
      const ower = userIds[getRandomEl(userIds.length)];
      fakeSchool.push(createFakeSchool(parentSchoolIds[getRandomEl(parentSchoolIds.length)], ower))
    }
    await knex('school').insert(fakeSchool);
  })

};