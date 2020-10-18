import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

export type AsyncRequestHandler<R = unknown> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<R>

/**
 * Wraps an async handler in a promise and on catch sends it to the error handler, or next if there is none given
 *
 * @example
 *
 *   app.get('path', asyncHandler(async function(req, res, next) {
 *     // ...
 *   }))
 *
 * @param handler
 * @param errorHandler
 */
export function asyncHandler<R = unknown>(
  handler: AsyncRequestHandler<R>,
  errorHandler?: ErrorRequestHandler
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(handler(req, res, next)).catch((err) => {
      if (typeof errorHandler !== 'undefined') {
        return errorHandler(err, req, res, next)
      }
      const nextError = next as ErrorRequestHandler
      nextError(err, req, res, next)
    })
  }
}
