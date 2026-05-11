import { SchemaType } from "@google/generative-ai";
import { z } from "zod";
/**
 * Convert a zod schema into Gemini's Function Calling JSON-Schema subset.
 *
 * Supported: ZodString (incl. enum), ZodNumber, ZodBoolean, ZodObject, ZodArray,
 * ZodEnum, and the ZodOptional / ZodDefault / ZodNullable / ZodEffects wrappers.
 * Unsupported zod features throw — kept deliberately narrow so a wrong-tool-
 * selection bug can't hide behind a silent type coercion.
 */
export function zodToGeminiSchema(schema) {
    return convert(schema);
}
function unwrap(schema) {
    let current = schema;
    let optional = false;
    let nullable = false;
    for (;;) {
        if (current instanceof z.ZodOptional) {
            optional = true;
            current = current._def.innerType;
        }
        else if (current instanceof z.ZodDefault) {
            optional = true;
            current = current._def.innerType;
        }
        else if (current instanceof z.ZodNullable) {
            nullable = true;
            current = current._def.innerType;
        }
        else if (current instanceof z.ZodEffects) {
            // Unwrap `.refine` / `.transform` wrappers — Gemini sees the base shape.
            current = current._def.schema;
        }
        else {
            break;
        }
    }
    return { inner: current, optional, nullable };
}
function convert(schema) {
    const { inner, nullable } = unwrap(schema);
    const description = schema.description ?? inner.description;
    if (inner instanceof z.ZodString) {
        return { type: SchemaType.STRING, description, nullable };
    }
    if (inner instanceof z.ZodNumber) {
        const checks = (inner._def.checks ?? []);
        const isInt = checks.some((c) => c.kind === "int");
        return {
            type: isInt ? SchemaType.INTEGER : SchemaType.NUMBER,
            description,
            nullable,
        };
    }
    if (inner instanceof z.ZodBoolean) {
        return { type: SchemaType.BOOLEAN, description, nullable };
    }
    if (inner instanceof z.ZodEnum) {
        const values = inner._def.values;
        return {
            type: SchemaType.STRING,
            format: "enum",
            enum: values,
            description,
            nullable,
        };
    }
    if (inner instanceof z.ZodArray) {
        const itemSchema = inner._def.type;
        return {
            type: SchemaType.ARRAY,
            items: convert(itemSchema),
            description,
            nullable,
        };
    }
    if (inner instanceof z.ZodObject) {
        const rawShape = inner._def.shape();
        const properties = {};
        const required = [];
        for (const [key, value] of Object.entries(rawShape)) {
            properties[key] = convert(value);
            if (!unwrap(value).optional)
                required.push(key);
        }
        const out = {
            type: SchemaType.OBJECT,
            properties,
            description,
            nullable,
        };
        if (required.length > 0) {
            out.required = required;
        }
        return out;
    }
    throw new Error(`zodToGeminiSchema: unsupported zod type "${inner.constructor.name}" — ` +
        `extend the converter or narrow the tool's inputSchema.`);
}
//# sourceMappingURL=zodToGeminiSchema.js.map