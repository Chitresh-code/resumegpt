import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  const isDevelopment = process.env.NODE_ENV === "development";

  // Don't leak error details in production
  const message = isDevelopment
    ? err instanceof Error
      ? err.message
      : "Internal Server Error"
    : "Internal Server Error";

  const statusCode = err instanceof Error && "statusCode" in err
    ? (err as any).statusCode
    : 500;

  res.status(statusCode).json({
    message,
    ...(isDevelopment && err instanceof Error && { stack: err.stack }),
  });
};
