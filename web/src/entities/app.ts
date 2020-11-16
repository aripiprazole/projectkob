type AppResponseDto = {
  id: string;
  name: string;
  repository: string;
};

class App {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly repository: string
  ) {}

  public static of(data: AppResponseDto): App {
    return new App(data.id, data.name, data.repository);
  }
}

export default App;
