import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from './ormconfig'
import { ConfigModule } from '@nestjs/config'
import { BriefAnalyticsModule } from './modules/brief_analytics/brief_analytics.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    BriefAnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
