import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { isNewRelicEnabled } from './common/constants'
import { AppModule } from './app.module'
import { NewrelicInterceptor } from './common/interceptors/newrelic.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  if (isNewRelicEnabled && process.env.NODE_ENV !== 'development') {
    app.useGlobalInterceptors(new NewrelicInterceptor())
  }

  app.use(async (req, res, next) => {
    res.header(
      'Cross-Origin-Embedder-Policy',
      "require-corp; report-to='default'",
    )
    res.header('Cross-Origin-Opener-Policy', "same-site; report-to='default'")
    res.header('Cross-Origin-Resource-Policy', 'same-site')
    res.header('Permissions-Policy', 'interest-cohort=()')
    res.header('Referrer-Policy', 'strict-origin-when-cross-origin')
    res.header('X-Frame-Options', 'DENY')
    res.header('X-Powered-By', 'Mountain Dew')
    res.header('X-XSS-Protection', '1; mode=block')
    res.header('Access-Control-Allow-Origin', process.env.API_ORIGINS || '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.header('Access-Control-Allow-Headers', '*')

    if (req.method === 'OPTIONS') {
      return await res.sendStatus(204)
    }

    next()
  })

  await app.listen(5006)
}
bootstrap()
