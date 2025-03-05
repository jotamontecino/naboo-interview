import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateFavoriteInput {
  @Field()
  @IsNotEmpty()
  activity!: string;


  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  weight!: number;
}

@InputType()
export class ChangeWeightFavoriteInput {
  @Field()
  @IsNotEmpty()
  id!: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  weight!: number;
}
