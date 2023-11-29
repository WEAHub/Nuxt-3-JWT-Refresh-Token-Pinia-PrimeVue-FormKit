import { UserModel } from "~/types/User"
import { Nullable } from "primevue/ts-helpers"
import { APIMessage } from "~/types/APIMessage"
import { updateUser } from "~/server/models/user"
import protectRoute from "~/server/utils/protectRoute"

export default defineEventHandler(async (event) => {
  await protectRoute(event)
  
  const authUser: UserModel = event.context.user;

  if(!authUser) {
    return createError({ 
      statusCode: 401,
      message: 'Bad token user',
    })
  }

  const userPatchData = await readBody(event)

  const user: Nullable<UserModel> = Object.assign({}, await updateUser(userPatchData))
  delete user.password
  
  if(!user) {
    return createError({ 
      statusCode: 400,
      message: 'User not exists',
    })
  }

  const updateResponse: APIMessage<UserModel> = {
    title: 'User Update',
    message: 'Updated successfully!',
    payload: user
  }

  return updateResponse;
})