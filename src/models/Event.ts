import mongoose from 'mongoose';

// Date format: 1995-12-17T03:24:00 => Sun Dec 17 1995 03:24:00 GMT
type RepeatOptions = {
  daysOfWeek: string[];
  frequency: {
    value: number;
    multiplier: string;
  };
  ends: Date;
};

type Participant = {
  worker: mongoose.Schema.Types.ObjectId;
  confirmedStatus: string;
  checkedIn: {
    status: boolean;
    datetime: Date;
  };
  checkedOut: {
    status: boolean;
    datetime: Date;
  };
};

export type EventDocument = mongoose.Document & {
  organization: mongoose.Schema.Types.ObjectId;
  isPublished: boolean;
  title: string;
  location: mongoose.Schema.Types.ObjectId;
  createdBy: mongoose.Schema.Types.ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  isRepeatEvent: boolean;
  repeatOptions: RepeatOptions;
  participants: Participant[];
  links: string[];
};

// Date format: 1995-12-17T03:24:00 => Sun Dec 17 1995 03:24:00 GMT
const eventSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    title: String,
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
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
          type: mongoose.Schema.Types.ObjectId,
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

const Event = mongoose.model<EventDocument>('Event', eventSchema);
export default Event;
