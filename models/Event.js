const mongoose = require('mongoose');

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
      name: {
        type: String,
        required: true
      },
      fullAddress: String
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
