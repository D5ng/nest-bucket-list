export interface JwtPayload {
  sub: string
  username: string
}

export type UserWithRefreshToken = JwtPayload & {
  refreshToken: string
}
