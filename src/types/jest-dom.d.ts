import "jest-dom/extend-expect";
import "@testing-library/jest-dom";

// Extend expect for Bun test typings
declare module "bun:test" {
  interface Matchers<R> extends jest.Matchers<R> {}
}
