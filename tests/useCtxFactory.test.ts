import { describe, expect, test } from "bun:test";
import useCtxFactory from "src/index";
import { renderHook } from "@testing-library/react"; // Optional if you go full React Testing Library

describe("useCtxFactory", () => {
  test("can be created without error", () => {
    expect(typeof useCtxFactory).toBe("function");
  });
});
