import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from './favorite.schema';
import { 
    CreateFavoriteInput,
    ChangeWeightFavoriteInput,
} from './favorite.inputs.dto';
import { log } from 'console';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name)
    private favoriteModel: Model<Favorite>,
  ) {}

  async findAll(): Promise<Favorite[]> {
    return this.favoriteModel.find().sort({ weight: -1 }).exec();
  }
  
  async findByUser(userId: string): Promise<Favorite[]> {
    return this.favoriteModel
      .find({ owner: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Favorite> {
    const favorite = await this.favoriteModel.findById(id).exec();
    if (!favorite) throw new NotFoundException();
    return favorite;
  }

  async create(userId: string, data: CreateFavoriteInput): Promise<Favorite> {
    const favorite = await this.favoriteModel.create({
      ...data,
      owner: userId,
    });
    return favorite;
  }

  async changeWeight(userId: string, {weight, id}: ChangeWeightFavoriteInput): Promise<Favorite> {
    const favorite = await this.favoriteModel.findOneAndUpdate({_id: id, owner: userId}, { $set: {weight}}).exec();
    if (!favorite) throw new NotFoundException();
    return favorite;
  }

  async countDocuments(): Promise<number> {
    return this.favoriteModel.estimatedDocumentCount().exec();
  }

  async countDocumentsForUser(userId: string): Promise<number> {
    return this.favoriteModel
    .find({ owner: userId })
    .estimatedDocumentCount().exec();
  }
}
