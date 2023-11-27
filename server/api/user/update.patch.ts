import protectRoute from "~/server/utils/protectRoute"

export default defineEventHandler(async (event) => {
  await protectRoute(event)
  return {
    message: 'lol',
    title: 'lel'
  }
})