type RepoResponseDto = {
  name: string;
  url: string;
  isPrivate: boolean;
  isValid: boolean;
};

class Repository {
  public constructor(
    public readonly name: string,
    public readonly url: string,
    public readonly isPrivate: boolean,
    public readonly isValid: boolean
  ) {}

  public static of(data: RepoResponseDto): Repository {
    return new Repository(data.name, data.url, data.isPrivate, data.isValid);
  }
}

export default Repository;
