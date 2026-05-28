# Blog Platform (MERN Stack)

## Overview

This is a full-stack blogging platform built with the MERN (MongoDB, Express.js, React.js, Node.js) technology stack. The platform enables users to discover, read, create, edit, and manage blog posts. It features user authentication, post management with categories and tags, and a modern, responsive user interface. The backend provides a RESTful API for all blog operations, while the frontend offers an intuitive interface for content creation and consumption.

## Key Features

- **User Authentication**: Secure login system with user profile management
- **Post Management**: Create, read, update, and delete blog posts
- **Category System**: Organize posts by categories (Technology, Lifestyle, Travel, Food, Business, Health, Education, Entertainment)
- **Tagging System**: Add tags to posts for better organization and discoverability
- **Post Excerpts**: Automatic excerpt generation from content or manual excerpts
- **Read Time Estimation**: Calculate and display estimated reading time for posts
- **User Profiles**: Display author information including name, email, and bio
- **My Posts**: View and manage your own blog posts
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **RESTful API**: Well-structured backend API with proper error handling

## Installation and Running the Application

The HackerRank IDE provides a **built-in menu** for installing dependencies, running, and testing the application. This is the **preferred method** to interact with the application.

### Using the IDE Menu

1. When the question loads, the **Install** command is run automatically to install all required dependencies.
2. To start the application, click on **“Run”** from the menu.
3. To test the application, use the **“Test”** option in the same menu.

These menu actions will automatically run the respective terminal commands in the background.

> **Note**: To review the underlying commands being executed or for debugging purposes, refer to the terminal output.

## Database Reset

To manually reset the database to its initial state:

1. Stop the running server and then restart it.

2. Running test cases will also restore the database to its initial state automatically.


Email: john@example.com
Password: password123

request Header

{
  "x-user-id": "string",     // MongoDB ObjectId of authenticated user
  "Content-Type": "application/json"
}

request Body

{
  "title": "string",        // Required: Post title
  "content": "string",      // Required: Full post content
  "excerpt": "string",      // Optional: Short description
  "category": "string",     // Required: Technology or Lifestyle or so on
  "tags": ["string"],       // Optional: Array of tag strings
  "readTime": "number"      // Optional: Estimated read time in minutes
}

success Response

{
  "message": "Post created successfully",
  "post": {
    "_id": "string",           // MongoDB ObjectId
    "title": "string",         // Provided title
    "content": "string",       // Provided content
    "excerpt": "string",       // Provided or auto-generated
    "category": "string",      // Provided category
    "tags": ["string"],        // Provided tags or empty array
    "readTime": "number",      // Provided
    "published": true,         // Always true
    "author": {
      "_id": "string",         // User ObjectId
      "name": "string",        // User name
      "email": "string",       // User email
      "bio": "string"          // User bio
    },
    "createdAt": "ISO string", // Creation timestamp
    "updatedAt": "ISO string"  // Update timestamp
  }
}
