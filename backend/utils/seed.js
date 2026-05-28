import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Post from '../models/Post.js';
import { users } from '../data/users.js';
import { posts } from '../data/posts.js';

dotenv.config({ path: new URL('../.env', import.meta.url) });

const seedDatabase = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;
    if (!connectionString) {
      throw new Error('MONGODB_URI is not set. Add it to backend/.env');
    }

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const createdUsers = await User.insertMany(users);
    console.log(`Created ${createdUsers.length} users`);

    // Assign posts to users
    const postsWithAuthors = posts.map((post, index) => {
      let authorIndex;
      if (index < 3) {
        authorIndex = 0; // John
      } else if (index < 5) {
        authorIndex = 1; // Sarah
      } else if (index < 7) {
        authorIndex = 2; // Mike
      } else {
        authorIndex = 3; // Emma
      }

      return {
        ...post,
        author: createdUsers[authorIndex]._id
      };
    });

    const createdPosts = await Post.insertMany(postsWithAuthors);
    console.log(`Created ${createdPosts.length} posts`);

    console.log('\nDatabase seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
