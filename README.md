# Express Async Handler

[![Build Status](https://travis-ci.com/XPBytes/express-async-handler.svg?branch=master)](https://travis-ci.com/XPBytes/express-async-handler) [![NPM Package Version](https://badge.fury.io/js/@xpbytes%2Fexpress-async-handler.svg)](https://npmjs.org/package/@xpbytes/express-async-handler) [![Maintainability](https://api.codeclimate.com/v1/badges/d6465e2c4c2806882745/maintainability)](https://codeclimate.com/github/XPBytes/express-async-handler/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/d6465e2c4c2806882745/test_coverage)](https://codeclimate.com/github/XPBytes/express-async-handler/test_coverage)

Utility function to use async functions as express handlers

```bash
yarn add @xpbytes/express-async-handler
```

```typescript
import { asyncHandler } from '@xpbytes/express-async-handler'

app.get(
  '/test',
  asyncHandler(async (req, res, next) => {
    const code = await Promise.resolve(204)
    res.sendStatus(code).end()
  })
)
```

You can optionally give a second argument `errorHandler`:

```typescript
function onError(err, req, res, next) {
  // ...
}

app.get(
  '/test',
  asyncHandler(async (req, res, next) => {
    const code = await Promise.resolve(204)
    res.sendStatus(code).end()
  }, onError)
)
```
