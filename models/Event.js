const mongoose = require('mongoose');

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
      daysOfWeek: [
        {
          type: String,
          enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        }
      ],
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
  {
    timestamps: true // sets createdAt & updatedAt automatically
  }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;