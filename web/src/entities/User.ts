export type UserResponseDto = {
  id: number;
  login: string;
};

class User {
  public constructor(
    public readonly id: number,
    public readonly username: string
  ) {}

  public static of(data: UserResponseDto): User {
    return new User(data.id, data.login);
  }
}

export default User;
