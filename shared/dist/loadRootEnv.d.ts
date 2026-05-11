export interface LoadRootEnvResult {
    rootDir: string;
}
/**
 * Loads `.env.local` and `.env` from the monorepo root (not `process.cwd()`).
 * The root is located by walking up from this file until `pnpm-workspace.yaml`
 * is found. `.env.local` takes precedence over `.env`; neither overrides values
 * already set in `process.env`.
 *
 * Called from each package's `config.ts` before zod validation. Safe to call
 * repeatedly — the resolved root is cached per-process.
 *
 * Reason: `pnpm --filter <pkg> <script>` sets CWD to the package dir, so
 * relative dotenv paths miss the root-level `.env.local`.
 */
export declare function loadRootEnv(): LoadRootEnvResult;
/** Exposed for tests. */
export declare function findWorkspaceRoot(startDir: string): string;
/** Test-only: clears the cached root so subsequent calls re-resolve. */
export declare function __resetLoadRootEnvCache(): void;
//# sourceMappingURL=loadRootEnv.d.ts.map