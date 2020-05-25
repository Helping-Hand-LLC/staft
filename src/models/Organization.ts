import { Document, Schema, model } from 'mongoose';

const orgSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true
    },
    isPrivate: {
      type: Boolean,
      defualt: false
    }
  },
  { timestamps: true }
);

export interface IOrg extends Document {
  uid: string;
  isPrivate: boolean;
}

export default model<IOrg>('Organization', orgSchema);
