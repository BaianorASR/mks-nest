import { Director } from 'src/database/entities/director.entity';
import { DirectorNameMiddleware } from 'src/middlewares/director-name.middleware';

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DirectorController } from './controller/director.controller';
import { DirectorService } from './service/director.service';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  controllers: [DirectorController],
  providers: [DirectorService],
})
export class DirectorModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DirectorNameMiddleware)
      .forRoutes(
        { path: '', method: RequestMethod.POST },
        { path: '', method: RequestMethod.PUT },
      );
  }
}
