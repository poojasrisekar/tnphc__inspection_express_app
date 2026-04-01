import responses from "../utils/responses";
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateRequest = (
	schema: ObjectSchema,
	property: "body" | "query" | "params" = "body"
) => {
	return (req: Request, res: Response, next: NextFunction) => {
		// ? describe schema
		if (req.query["$schema"] === "true") {
			res.status(200).send({
				statusCode: 200,
				message: "Schema Description",
				data: { $schema: schema.describe() },
			});
		}

		if (!req.query["$schema"]) {
			// console.debug(schema.validate(req[property], { abortEarly: false }));
			const { error } = schema.validate(req[property], { abortEarly: false });

			if (error) {
				res.status(400).send({
					statusCode: 400,
					error: error.details.map((err) => err.message),
					message: "validation Error",
					// error: error.details.map((detail) => detail.message).join(","),
				});
			} else {
				next();
			}
		}
	};
};
