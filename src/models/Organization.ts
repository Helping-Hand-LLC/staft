import mongoose from 'mongoose';

export type OrganizationDocument = mongoose.Document & {
  uid: string;
  isPrivate: boolean;
};

const orgSchema = new mongoose.Schema(
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

const Organization = mongoose.model<OrganizationDocument>(
  'Organization',
  orgSchema
);
export default Organization;
