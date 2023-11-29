import { HttpStatusCode } from "axios";
import { deleteUser } from "~/server/models/user";
import { APIMessage } from "~/types/APIMessage";
import { UserModel } from "~/types/User";

export default defineEventHandler(async (event) => {
  await protectRoute(event)
  const id: string = event.context.params?.id!;
  const authUser: UserModel = event.context.user;

  if(authUser.id === id) {
    return createError({
      statusCode: HttpStatusCode.Conflict,
      statusMessage: 'Delete User',
      message: 'You can\'t delete yourself',
    })
  }

  const userDeletedConfirm = await deleteUser(id);

  if(!userDeletedConfirm) {
    return createError({
      statusCode: HttpStatusCode.BadRequest,
      statusMessage: 'Delete User',
      message: 'Can\'t delete this user',
    })
  }

  const deleteResponse: APIMessage<Partial<UserModel>> = {
    title: 'Delete User',
    message: 'User deleted successfully!',
    payload: { id }
  }

  return deleteResponse
})