interface RequestWithUser extends Request {
  user: {
    sub: string
    username: string
    refreshToken: string
  }
}
