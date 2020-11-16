class Page<T> {
  public constructor(
    public readonly items: T[],
    public readonly totalPages: number
  ) {}

  public map<R>(fmap: (item: T) => R): Page<R> {
    return new Page(this.items.map(fmap), this.totalPages);
  }

  public filter(filter: (item: T) => boolean): Page<T> {
    return new Page(this.items.filter(filter), this.totalPages);
  }

  public append(item: T): Page<T> {
    return new Page([...this.items, item], this.totalPages);
  }
}

export default Page;
