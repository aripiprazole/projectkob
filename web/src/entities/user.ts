export type UserResponseDto = {
  id: number;
  login: string;
  avatar_url: string;
};

class User {
  public constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly avatar: string
  ) {}

  public static of(data: UserResponseDto): User {
    return new User(data.id, data.login, data.avatar_url);
  }
}

export default User;
