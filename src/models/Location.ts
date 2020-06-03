import { Document, Schema, model } from 'mongoose';
import { IOrg } from './Organization';

const locationSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  formatted_address: {
    type: String,
    required: true
  },
  geometry: {
    location: {
      lat: Number,
      lng: Number
    }
  },
  icon: String,
  name: {
    type: String,
    required: true
  },
  place_id: {
    type: String,
    required: true
  }
});

export interface ILocation extends Document {
  organization: IOrg['_id'];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  icon: string;
  name: string;
  place_id: string;
}

export default model<ILocation>('Location', locationSchema);
