type AppResponseDto = {
  id: string;
  name: string;
  repo: string;
};

class App {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly repo: string
  ) {}

  public static of(data: AppResponseDto): App {
    return new App(data.id, data.name, data.repo);
  }
}

export default App;
