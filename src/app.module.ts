import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Actor } from './database/entities/actor.entity';
import { Category } from './database/entities/category.entity';
import { Director } from './database/entities/director.entity';
import { ActorMiddleware } from './middlewares/validateActor.middleware';
import { CategoryMiddleware } from './middlewares/validateCategory.middleware';
import { DirectorMiddleware } from './middlewares/validateDirector.middleware';
import { ActorModule } from './modules/actor/actor.module';
import { CategoryModule } from './modules/category/category.module';
import { DirectorModule } from './modules/director/director.module';
import { MovieModule } from './modules/movie/movie.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/database/MoviesDB.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Category, Director, Actor]),
    ActorModule,
    CategoryModule,
    DirectorModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CategoryMiddleware, DirectorMiddleware, ActorMiddleware)
      .forRoutes(
        { path: 'movie', method: RequestMethod.POST },
        { path: 'movie', method: RequestMethod.PUT },
      );
  }
}
