import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import typeormConfig from './config/typeorm.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<TypeOrmModuleOptions>('typeorm')

        if (!config) {
          throw new Error('TypeORM 설정을 찾을 수 없어요.')
        }

        return config
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
