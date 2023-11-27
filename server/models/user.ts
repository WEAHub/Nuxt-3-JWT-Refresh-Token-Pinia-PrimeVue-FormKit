import type { UserModel } from "~/types/User";

// Fake users data
const users: UserModel[] = [
  {
    id: '41dbc5f7-9a4e-42e6-832b-1d3dd8c7c4b6',
    email: 'test@test.com',
    name: 'test',
    password: '$2a$10$QCgWxDZ8guctnLkE1DHfxO/w/z649fso/ptuYw5CTaEtueWEZG9ri',
  },
];

export async function getUsers() {
  return users;
}

export async function getUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

export async function getUserById(id: string) {
  return users.find((user) => user.id === id);
}