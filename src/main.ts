import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SERVER_PORT } from './common/configuration'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )
  await app.listen(SERVER_PORT)
}
bootstrap()
