import type { UserModel } from "~/types/User";
import { Nullable } from "primevue/ts-helpers";
import mockUsers from "~/server/mock/user"

// Fake users data
const users: UserModel[] = mockUsers;

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