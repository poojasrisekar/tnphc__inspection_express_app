import responses from "../utils/responses";
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateRequest = (
	schema: ObjectSchema,
	property: "body" | "query" | "params" = "body"
) => {
	return (req: Request, res: Response, next: NextFunction) => {
		// ✅ Schema preview (optional)
		if (req.query["$schema"] === "true") {
			return res.status(200).send({
				statusCode: 200,
				message: "Schema Description",
				data: { $schema: schema.describe() },
			});
		}

		// ✅ Validate with conversion enabled
		const { error, value } = schema.validate(req[property], {
			abortEarly: false,
			allowUnknown: true,
			convert: true // 🔥 THIS FIXES YOUR ISSUE
		});

		// ❌ If validation fails
		if (error) {
			return res.status(400).send({
				statusCode: 400,
				error: error.details.map((err) => err.message),
				message: "Validation Error",
			});
		}

		// // ✅ VERY IMPORTANT: assign converted values back
		// req[property] = value;

		next();
	};
};