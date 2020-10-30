export default interface Page<T> {
  items: T[];
  currentPage: number;
  pages: number;
}
