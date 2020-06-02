import mongoose from 'mongoose';
import { mongoUri } from './keys';

export default async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    // handle errors after initial connection
    mongoose.connection.on('error', err =>
      console.error(`Mongodb Connection Error: ${err.message}`)
    );

    console.log('mongodb connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
