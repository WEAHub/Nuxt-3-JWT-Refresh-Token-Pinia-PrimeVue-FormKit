import { Nullable } from "primevue/ts-helpers";
import type { UserModel } from "~/types/User";

// Fake users data
const users: UserModel[] = [
  {
    id: '41dbc5f7-9a4e-42e6-832b-1d3dd8c7c4b6',
    email: 'test@test.com',
    name: 'test',
    password: '$2a$10$QCgWxDZ8guctnLkE1DHfxO/w/z649fso/ptuYw5CTaEtueWEZG9ri',
    avatarURL: 'https://falcondigital.co.uk/wp-content/uploads/2021/11/PngItem_950994.png'
  },
];

export async function getUsers() {
  return users;
}

export async function getUserByEmail(email: string): Promise<Nullable<UserModel>> {
  return users.find((user) => user.email === email);
}

export async function getUserById(id: string): Promise<Nullable<UserModel>>{
  return users.find((user) => user.id === id);
}

export async function updateUser(user: UserModel): Promise<Nullable<UserModel>> {
  const userFound: UserModel = users.find(_user => _user.id === user.id)!
  if(!userFound) return null;
  Object.assign(userFound, {...user})
  return userFound;
}