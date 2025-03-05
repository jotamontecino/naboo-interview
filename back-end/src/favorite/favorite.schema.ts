import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../user/user.schema';
import { Activity } from '../activity/activity.schema';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Favorite extends Document {
  @Field(() => ID)
  id!: string;

  @Field(() => Activity)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true,
  })
  activity!: Activity;

  @Field(() => User)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner!: User;

  @Field()
  @Prop({ required: true, default: 0 })
  weight!: number;

  @Field(() => Date, { nullable: true })
  createdAt!: Date;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
