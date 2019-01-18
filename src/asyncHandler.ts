import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>

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
export function asyncHandler(
  handler: AsyncRequestHandler,
  errorHandler?: ErrorRequestHandler
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch((err) => {
      if (typeof errorHandler !== 'undefined') {
        return errorHandler(err, req, res, next)
      }

      ;(next as ErrorRequestHandler)(err, req, res, next)
    })
  }
}
