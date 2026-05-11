import { type Schema } from "@google/generative-ai";
import { z } from "zod";
/**
 * Convert a zod schema into Gemini's Function Calling JSON-Schema subset.
 *
 * Supported: ZodString (incl. enum), ZodNumber, ZodBoolean, ZodObject, ZodArray,
 * ZodEnum, and the ZodOptional / ZodDefault / ZodNullable / ZodEffects wrappers.
 * Unsupported zod features throw — kept deliberately narrow so a wrong-tool-
 * selection bug can't hide behind a silent type coercion.
 */
export declare function zodToGeminiSchema(schema: z.ZodTypeAny): Schema;
//# sourceMappingURL=zodToGeminiSchema.d.ts.map