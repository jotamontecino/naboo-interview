import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Int,
  Parent,
  ResolveField,
  ID,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Favorite } from './favorite.schema';
import { 
    CreateFavoriteInput,
    ChangeWeightFavoriteInput,
} from './favorite.inputs.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.schema';
import { Activity } from '../activity/activity.schema';
import { ActivityService } from '../activity/activity.service';

import { ContextWithJWTPayload } from 'src/auth/types/context';
import { cpSync } from 'fs';

@Resolver(() => Favorite)
export class FavoriteResolver {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly activityService: ActivityService,
  ) {}

  @ResolveField(() => ID)
  id(@Parent() favorite: Favorite): string {
    return favorite._id.toString();
  }

  @ResolveField(() => User)
  async owner(@Parent() favorite: Favorite): Promise<User> {
    await favorite.populate('owner');
    return favorite.owner;
  }

  @ResolveField(() => Activity)
  async activity(@Parent() favorite: Favorite): Promise<Activity> {
    await favorite.populate('activity');
    return favorite.activity;
  }

  @Query(() => [Favorite])
  @UseGuards(AuthGuard)
  async getFavorites(
    @Context() context: ContextWithJWTPayload,
  ): Promise<Favorite[]> {
    return this.favoriteService.findAll();
    
  }

  @Mutation(() => Favorite)
  @UseGuards(AuthGuard)
  async createFavorite(
    @Context() context: ContextWithJWTPayload,
    @Args('createFavoriteInput') createFavorite: CreateFavoriteInput,
  ): Promise<Favorite> {
    try {
      await this.activityService.findOne(createFavorite.activity);  
    } catch (error: any) {
        if (error.message === "Not Found") {
            throw new Error(`Activity(${createFavorite.activity}) not found`);
        }
        throw error;
    }      
    return this.favoriteService.create(context.jwtPayload.id, createFavorite);
    
  }


  @Mutation(() => Favorite)
  @UseGuards(AuthGuard)
  async changeFavoriteWeightById(
    @Context() context: ContextWithJWTPayload,
    @Args('ChangeWeightFavoriteInput') changeFavoriteWeightById: ChangeWeightFavoriteInput,
  ): Promise<Favorite> { 
    return this.favoriteService.changeWeight(context.jwtPayload.id, changeFavoriteWeightById);
    
  }
}