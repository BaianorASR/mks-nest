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
import { Movie } from './database/entities/movie.entity';
import { ActorNameMiddleware } from './middlewares/actor-name.middleware';
import { CategoryNameMiddleware } from './middlewares/category-name.middleware';
import { DirectorNameMiddleware } from './middlewares/director-name.middleware';
import { MovieNameMiddleware } from './middlewares/movie-name.middleware';
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
    TypeOrmModule.forFeature([Category, Director, Actor, Movie]),
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
      .apply(
        MovieNameMiddleware,
        CategoryMiddleware,
        DirectorMiddleware,
        ActorMiddleware,
      )
      .forRoutes(
        { path: 'movie', method: RequestMethod.POST },
        { path: 'movie', method: RequestMethod.PUT },
      )
      .apply(CategoryNameMiddleware)
      .forRoutes(
        { path: 'category', method: RequestMethod.POST },
        { path: 'category', method: RequestMethod.PUT },
      )
      .apply(DirectorNameMiddleware)
      .forRoutes(
        { path: 'director', method: RequestMethod.POST },
        { path: 'director', method: RequestMethod.PUT },
      )
      .apply(ActorNameMiddleware)
      .forRoutes(
        { path: 'actor', method: RequestMethod.POST },
        { path: 'actor', method: RequestMethod.PUT },
      );
  }
}
