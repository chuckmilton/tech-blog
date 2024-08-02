# CSULB Tech News Blog

This project showcases my experience with Node.js, Express.js, and EJS. The goal was to develop a web server using Node.js and Express.js for routing and middleware, while EJS was utilized as the templating engine to generate dynamic HTML.

## Features

- **Post Creation**: Users can create new posts.
- **Post Viewing**: Users can view all posts on the explore page.
- **Post Update/Delete**: Users can edit and delete their posts, with changes confirmed through password verification.

## Deployment with Render

This project is deployed using Render's free hosting service. Please note:
- **Temporary Storage**: Since Render's free tier does not include a persistent database, any data created may be lost during redeployments.
- **Limitations**: As this deployment lacks a database, it’s recommended to use this for demonstration purposes only. For production use, consider integrating a persistent storage solution.

## Getting Started

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/tech-blog.git
    cd tech-blog
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the Application Locally**:
    ```bash
    npm start
    ```

4. **Access the Application**: Open `http://localhost:3000` in your web browser.
