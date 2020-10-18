import express, { Request, Response } from 'express'
import request from 'supertest'
import test from 'tape'

import { asyncHandler } from '../src/asyncHandler'

const app = express()
  .get(
    '/test',
    asyncHandler(async (_, res) => {
      const code = await Promise.resolve(204)
      res.sendStatus(code).end()
    })
  )
  .get(
    '/error',
    asyncHandler(async () => {
      throw new Error('nope')
    })
  )
  .get(
    '/error-with-handler',
    asyncHandler(
      async () => {
        throw new Error('nope')
      },
      (_, __, res) => {
        res.sendStatus(204).end()
      }
    )
  )
  .use((_: unknown, __: Request, res: Response) => {
    res.sendStatus(500).end()
  })

test('it handles async functions (resolve)', (t) => {
  request(app)
    .get('/test')
    .expect(204)
    .end((err) => {
      if (err) {
        throw err
      }
      t.pass('resolved correctly')
      t.end()
    })
})

test('it handles async functions (reject)', (t) => {
  request(app)
    .get('/error')
    .expect(500)
    .end((err) => {
      if (err) {
        throw err
      }
      t.pass('rejected correctly')
      t.end()
    })
})

test('it handles async functions (reject + handler)', (t) => {
  request(app)
    .get('/error-with-handler')
    .expect(204)
    .end((err) => {
      if (err) {
        throw err
      }
      t.pass('rejected correctly')
      t.end()
    })
})
