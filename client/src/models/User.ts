class User {
  public constructor(public id: number, public login: string) {}

  public static ofResponse(data: any) {
    return new User(data.id, data.login);
  }
}

export default User;
