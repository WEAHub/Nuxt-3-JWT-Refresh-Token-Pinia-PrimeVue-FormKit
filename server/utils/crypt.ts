import bcrypt from 'bcrypt'

export async function hash(plainPassword: string) {
  return bcrypt.hash(plainPassword, 10)
}

export async function verify(plainPassword: string, hash: string) {
  return bcrypt.compare(plainPassword, hash)
}