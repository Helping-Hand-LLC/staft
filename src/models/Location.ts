import mongoose from 'mongoose';

export type LocationDocument = mongoose.Document & {
  organization: mongoose.Schema.Types.ObjectId;
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
};

const locationSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
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

const Location = mongoose.model<LocationDocument>('Location', locationSchema);
export default Location;
