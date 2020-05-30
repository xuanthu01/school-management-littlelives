import * as Knex from "knex";
import * as faker from "faker";
import * as async from "async";
import { getRandomEl, payment_types, getRandomElAndRemove } from "../utils";
import { UserRole } from "../../src/auth/user.entity";

const createFakeSchool = (
  parent_id: string | number,
  owner_id: string | number
) => {
  return {
    name: faker.company.companyName(),
    parentIdId: parent_id,
    payment_type: payment_types[getRandomEl(2)],
    owner_id
  }
}
const createParentSchool = (ower: string | number) => createFakeSchool(null, ower);

export async function seed(knex: Knex, ownerIds: [{ id: string | number, role: string }]): Promise<any> {
  await knex('school').del();
  const desiredFakes = ownerIds.length - 5;
  const fakeSchool = [];

  const desiredParentSchool = 5;
  const parentSchool = [];
  for (let i = 0; i < desiredParentSchool; i++) {
    const ower = ownerIds[getRandomEl(ownerIds.length)];
    if (ower.role === UserRole.HQ) {
      parentSchool.push(createParentSchool(ower.id));
    }
    else {
      const idx = ownerIds.findIndex(o => o.id === ower.id);
      const removed = ownerIds.splice(idx, 1);
      const item = removed.length > 0 && removed[0];
      parentSchool.push(createParentSchool(item.id));
    }
    // const ower: number = getRandomElAndRemove(ownerIds);

  }
  await knex('school').insert(parentSchool).then(async () => {
    console.log("seed parentSchool complete");
    const schools = await knex('school').select('id');
    const parentSchoolIds: number[] = [...schools, { id: null }].map(school => school.id);
    for (let i = 0; i < desiredFakes; i++) {
      // const ower: number = getRandomElAndRemove(ownerIds);
      const parent_id = parentSchoolIds[getRandomEl(parentSchoolIds.length)]
      const ower = ownerIds[getRandomEl(ownerIds.length)];
      if (ower.role === UserRole.HQ) {
        fakeSchool.push(createFakeSchool(parent_id, ower.id))
      }
      else {
        const idx = ownerIds.findIndex(o => o.id === ower.id);
        const removed = ownerIds.splice(idx, 1);
        const item = removed.length > 0 && removed[0];

        fakeSchool.push(createFakeSchool(parent_id, item.id))
      }
      // fakeSchool.push(createFakeSchool(parentSchoolIds[getRandomEl(parentSchoolIds.length)], ower))
    }
    await knex('school').insert(fakeSchool);
  })

};
