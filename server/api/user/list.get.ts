import { getUsers } from "~/server/models/user";
import { UserModel } from "~/types/User";

export default defineEventHandler(async (event) => {
  await protectRoute(event)
  const users: UserModel[] = await getUsers()
  return { users }
})