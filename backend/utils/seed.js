import mongoose from 'mongoose';
import User from '../models/User.js';
import Post from '../models/Post.js';
import { users } from '../data/users.js';
import { posts } from '../data/posts.js';

const connectionString =
  process.env.MONGODB_URI 
  //|| 'mongodb+srv://mathewanm_db_user:qU7kGnQRefjguCJB@cluster0.p3auebr.mongodb.net/BlogPlatform?retryWrites=true&serverSelectionTimeoutMS=2000';
  //'mongodb://127.0.0.1:27017/BlogPlatform?directConnection=true&serverSelectionTimeoutMS=2000';

  //mongodb+srv://admin:MyStrongPassword@mycluster.abcd123.mongodb.net/myDatabase

  //https://cloud.mongodb.com/v2/6a0231f318bfb0a20517e910#/overview


const seedDatabase = async () => {
  try {
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
