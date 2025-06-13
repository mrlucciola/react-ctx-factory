import { type FC, type PropsWithChildren } from "react";
type TStateSelector<TParams extends any[] = any[], TReturn extends any = any> = (...args: TParams) => TReturn;
type ICtxSelector<TCtx extends ReturnType<TStateSelector>> = <TField>(selector: (state: TCtx) => TField) => TField;
/**
 * ### Usage:
 * ```tsx
 * // Example 1: With separate state hook
 * const useCtxState = () => {
 *   const [isLoading, setIsLoading] = useState(false);
 *
 *   return {
 *     isLoading,
 *     setIsLoading,
 *   };
 * };
 *
 * export const { useMyCtx, MyProvider } = useCtxFactory(useCtxState, "My");
 * export type IMyCtx = ICtxState<typeof useMyCtx>; // or `ReturnType<typeof useCtxState>`
 *
 * // Example 2: All in one
 * export const { useTestCtx, TestProvider } = useCtxFactory(() => {
 *   const [isLoading, setIsLoading] = useState(false);
 *   return {
 *     isLoading,
 *     setIsLoading,
 *   };
 * }, "Test");
 * type ITestCtx = ICtxState<typeof useTestCtx>
 * ```
 */
declare const useCtxFactory: <THook extends TStateSelector, TCtx extends ReturnType<THook>, TLabel extends Capitalize<string>>(useCtxHook: THook, label: TLabel) => Record<ProviderLabel<TLabel>, FC<PropsWithChildren>> & Record<HookLabel<TLabel>, <TField>(selector: (state: TCtx) => TField) => TField>;
type ProviderLabel<TLabel extends string> = `${Capitalize<TLabel>}Provider`;
type HookLabel<TLabel extends string> = `use${Capitalize<TLabel>}Ctx`;
export default useCtxFactory;
/** ### Derive the output type of the state using the selector-hook
 * Example:
 * ```ts
 * // 1: Create the context-state
 * export const { useTestCtx, TestProvider } = useCtxFactory(() => {
 *   const [isLoading, setIsLoading] = useState(false);
 *   return {
 *     isLoading,
 *     setIsLoading,
 *   };
 * }, "Test");
 *
 * // 2: Create the type
 * export type ITestCtx = ICtxState<typeof useTestCtx>
 * ```
 */
export type ICtxState<TCtxHook extends ICtxSelector<ReturnType<TStateSelector>>> = Parameters<Parameters<TCtxHook>[0]>[0];
//# sourceMappingURL=index.d.ts.map