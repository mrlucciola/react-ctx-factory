# react-ctx-factory

**Typed factory for creating React Context providers and field-level selector hooks.**

Enables clean, testable, and performant global state with no extra dependencies.

[![NPM version](https://img.shields.io/npm/v/react-ctx-factory)](https://www.npmjs.com/package/react-ctx-factory)
[![CI](https://github.com/mrlucciola/react-ctx-factory/actions/workflows/ci.yml/badge.svg)](https://github.com/mrlucciola/react-ctx-factory/actions)
[![MIT License](https://img.shields.io/github/license/mrlucciola/react-ctx-factory)](./LICENSE)

## ✨ Features

- ✅ Strongly-typed Context creation via a single hook factory
- 🧩 Auto-generates named Provider and `useCtx()` hook
- 🔍 Supports **field-level selectors** (like Recoil / Zustand)
- 🧪 First-class testability — no reliance on magic globals
- ⚛️ Native React API (no custom Provider nesting or classes)
- 🔋 Lightweight (zero dependencies)

## 🛡️ Type Safety

• Selector hooks only expose TCtx fields
• Catch invalid usage outside of Provider
• Works with deeply nested structures

## 📦 Installation

```bash
bun add react-ctx-factory
# or
npm install react-ctx-factory
# or
yarn add react-ctx-factory
```

## 🧰 API

useCtxFactory(hook: () => TCtx, label: string)

Returns:
• {[label + "Provider"]: React.FC}
• {["use" + label + "Ctx"]: <TField>(selector: (state: TCtx) => TField) => TField}

Internally creates a Context + Provider + selector hook in one call.

---

# Usage

```tsx
import useCtxFactory from "react-ctx-factory";

const { TestProvider, useTestCtx } = useCtxFactory(() => {
  const [count, setCount] = useState(0);
  return { count, setCount };
}, "Test");

const Counter: FC = () => {
  const count = useTestCtx((s) => s.count);
  return <div>{count}</div>;
};

// Wrap components in the generated Provider
export const App = () => (
  <TestProvider>
    <Counter />
  </TestProvider>
);
```

# Typing the Context

```tsx
import useCtxFactory, { type ICtxState } from "react-ctx-factory";

const { TestProvider, useTestCtx } = useCtxFactory(() => {
  const [count, setCount] = useState(0);
  return { count, setCount };
}, "Test");

type ITestCtx = ICtxState<typeof useTestCtx>;
// Inferred: { count: number; setCount: Dispatch<SetStateAction<number>> }
```

# Testing

```tsx
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

describe("TestContext", () => {
  test("renders value", () => {
    render(
      <TestProvider>
        <Counter />
      </TestProvider>
    );
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("throws outside provider", () => {
    const Broken = () => {
      useTestCtx((s) => s.count);
      return null;
    };
    expect(() => render(<Broken />)).toThrow("useTestCtx must be used within TestProvider");
  });
});
```
