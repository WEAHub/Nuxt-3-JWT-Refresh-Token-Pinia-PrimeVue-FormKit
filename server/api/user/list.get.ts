import { getUsers } from "~/server/models/user";
import { UserModel } from "~/types/User";

export default defineEventHandler(async (event) => {
  await protectRoute(event)
  const users: UserModel[] = await getUsers();
  return { 
    users: users.map((user: UserModel) => ({
      id: user.id,
      avatarURL: user.avatarURL,
      email: user.email,
      name: user.name
    }))
  }
})