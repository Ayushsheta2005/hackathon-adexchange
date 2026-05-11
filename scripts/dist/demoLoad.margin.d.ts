export interface BuildMarginExplainerOpts {
    cycles: number;
    /** Sum of clearing prices already settled, as a 6-decimal USDC string. */
    totalUsdcSettled: string;
}
/**
 * Produce the margin-explainer banner lines shown at the end of demo:load.
 * Pure function: given `cycles` and total USDC settled, return deterministic
 * banner lines so the margin story is reproducible across demo runs.
 */
export declare function buildMarginExplainer(opts: BuildMarginExplainerOpts): string[];
//# sourceMappingURL=demoLoad.margin.d.ts.map