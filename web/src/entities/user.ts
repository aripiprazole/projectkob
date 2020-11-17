export type UserResponseDto = {
  id: number;
  username: string;
  avatar: string;
};

class User {
  public constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly avatar: string
  ) {}

  public static of(data: UserResponseDto): User {
    return new User(data.id, data.username, data.avatar);
  }
}

export default User;
