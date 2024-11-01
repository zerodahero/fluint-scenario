import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data } from './data.db';

@Injectable()
export class DataDao {
  constructor(
    @InjectModel(Data.name, 'local')
    private dataModel: Model<Data>,
  ) {}

  async get(id: string): Promise<Data> {
    return this.dataModel.findById(id);
  }

  async getAll(): Promise<Data[]> {
    return this.dataModel.find();
  }

  async create(data: string): Promise<void> {
    await this.dataModel.create({ data });
  }

  async update(id: string, data: string): Promise<void> {
    await this.dataModel.updateOne({ _id: id }, { data });
  }

  async delete(id: string): Promise<void> {
    await this.dataModel.deleteOne({ _id: id });
  }
}
