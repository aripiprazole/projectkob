type RepoResponseDto = {
  id: number;
  full_name: string;
  private: boolean;
  html_url: string;
  permissions: PermissionsResponseDto;
};

type PermissionsResponseDto = {
  admin: boolean;
  push: boolean;
  pull: boolean;
};

export class Permissions {
  public constructor(
    public readonly admin: boolean,
    public readonly push: boolean,
    public readonly pull: boolean
  ) {}

  public static of(data: PermissionsResponseDto): Permissions {
    return new Permissions(data.admin, data.push, data.pull);
  }
}

class Repo {
  public constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly isPrivate: boolean,
    public readonly url: string,
    public readonly permissions: Permissions
  ) {}

  public static of(data: RepoResponseDto): Repo {
    return new Repo(
      data.id,
      data.full_name,
      data.private,
      data.html_url,
      Permissions.of(data.permissions)
    );
  }
}

export default Repo;
