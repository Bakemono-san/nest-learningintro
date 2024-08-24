import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth/auth.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DettesModule } from './dettes/dettes.module';
import { ProduitsModule } from './produits/produits.module';
import { PayementsModule } from './payements/payements.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('TOKEN') || 'bakemono',
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DettesModule,
    ProduitsModule,
    PayementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
