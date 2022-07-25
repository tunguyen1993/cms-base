import { Injectable } from '@nestjs/common';
import { BaseServiceInterface } from '../interfaces';
import { Model } from 'mongoose';

@Injectable()
export class BaseService<T = any> implements BaseServiceInterface<T> {
  constructor(protected model: Model<Document>) {}

  async actionCreate(data: any): Promise<Document | undefined> {
    return await this.model.create(data);
  }

  actionFindByIdAndUpdate = async (_id: any, data: any): Promise<T> =>
    this.model.findByIdAndUpdate(_id, data);

  async actionFindById(_id: string): Promise<T> {
    return this.model.findById(_id);
  }

  async actionCreateMany(data: any[]): Promise<any[]> {
    return this.model.insertMany(data);
  }
  async actionGetAll(): Promise<any[]> {
    return this.model.find({});
  }
  async actionDeleteAll(): Promise<any> {
    return this.model.deleteMany({});
  }
}
