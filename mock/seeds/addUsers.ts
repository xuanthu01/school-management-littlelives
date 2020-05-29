import * as Knex from "knex";
import * as faker from "faker";
import { hashSync, genSaltSync } from "bcrypt";
import { getRandomEl, roles } from "../utils";


const createFakeUser = (salt: string) => {
  return {
    username: faker.internet.userName(),
    password: hashSync('Aa!@#123', salt),
    salt,
    role: roles[getRandomEl(4)]
  }
}
export async function seed(knex: Knex): Promise<any> {
  await knex("user").del();
  const fakeUser = [];
  const desiredFakes = 100;
  for (let i = 0; i < desiredFakes; i++) {
    const salt = genSaltSync();
    const user = createFakeUser(salt)
    fakeUser.push(user);
    console.table({ ...user, default_password: 'Aa!@#123' });
  }
  await knex('user').insert(fakeUser)
};
