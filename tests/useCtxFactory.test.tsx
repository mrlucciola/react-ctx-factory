import { useState, type FC } from "react";
// testing
import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
// local
import "./setupTests";
import useCtxFactory, { type ICtxState } from "src/index";

const { useTestCtx, TestProvider } = useCtxFactory(() => {
  const [value, setValue] = useState("hello");
  return { value, setValue };
}, "Test");
type ITestCtx = ICtxState<typeof useTestCtx>;

const TestComponent: FC = () => {
  const value = useTestCtx((s) => s.value);
  return <p data-testid="output">{value}</p>;
};

describe("useCtxFactory", () => {
  test("renders wrapped component with initial context state", () => {
    render(
      <TestProvider>
        <TestComponent />
      </TestProvider>
    );

    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("hello");
  });

  test("throws error if used outside Provider", () => {
    const BrokenComponent = () => {
      // This will throw
      useTestCtx((ctx) => ctx.value);
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      "useTestCtx must be used within TestProvider"
    );
  });
});
