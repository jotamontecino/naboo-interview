import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { FavoriteService } from './favorite.service';
import { Favorite, FavoriteSchema } from './favorite.schema';
import { FavoriteResolver } from './favorite.resolver';
import { ActivityModule } from 'src/activity/activity.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
    ActivityModule,
    AuthModule,
    UserModule,
  ],
  exports: [FavoriteService],
  providers: [FavoriteService, FavoriteResolver],
})
export class FavoriteModule {}
