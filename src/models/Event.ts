import { Document, Schema, model, Types } from 'mongoose';
import { IUser } from './User';
import { IOrg } from './Organization';
import { ILocation } from './Location';

// Date format: 1995-12-17T03:24:00 => Sun Dec 17 1995 03:24:00 GMT
const eventSchema = new Schema(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    title: String,
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    startDateTime: {
      type: Date,
      required: true
    },
    endDateTime: {
      type: Date,
      required: true
    },
    isRepeatEvent: {
      type: Boolean,
      default: false
    },
    repeatOptions: {
      // by default, repeat events become published 1 month before event start date
      daysOfWeek: {
        type: [String],
        default: []
      },
      frequency: {
        value: Number,
        multiplier: {
          type: String,
          enum: ['weeks', 'months', 'years']
        }
      },
      ends: Date
    },
    participants: [
      {
        worker: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        confirmedStatus: {
          type: String,
          default: 'unconfirmed',
          enum: ['unconfirmed', 'accepted', 'rejected']
        },
        checkedIn: {
          status: {
            type: Boolean,
            default: false
          },
          datetime: Date
        },
        checkedOut: {
          status: {
            type: Boolean,
            default: false
          },
          datetime: Date
        }
      }
    ],
    links: [String]
  },
  { timestamps: true }
);

// Date format: 1995-12-17T03:24:00 => Sun Dec 17 1995 03:24:00 GMT
interface IRepeatOptions {
  daysOfWeek: Types.Array<string>;
  frequency: {
    value: number;
    multiplier: string;
  };
  ends: Date;
}

export interface IParticipant {
  worker: IUser['_id'];
  confirmedStatus: string;
  checkedIn: {
    status: boolean;
    datetime: Date;
  };
  checkedOut: {
    status: boolean;
    datetime: Date;
  };
}

export interface IEvent extends Document {
  organization: IOrg['_id'];
  isPublished: boolean;
  title: string;
  location: ILocation['_id'];
  createdBy: IUser['_id'];
  startDateTime: Date;
  endDateTime: Date;
  isRepeatEvent: boolean;
  repeatOptions: IRepeatOptions;
  participants: Types.Array<IParticipant>;
  links: Types.Array<string>;
}

export default model<IEvent>('Event', eventSchema);
