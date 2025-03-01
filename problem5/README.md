# My Vite, Express, and SQLite Project

## Overview

This project is a web API built using Vite, Express, and SQLite with TypeScript. It provides functionalities to create, read, update, and delete user information in a SQLite database.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Config](#config)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Running the Project](#running-the-project)
- [Technologies Used](#technologies-used)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/my-vite-express-sqlite-project.git
   cd my-vite-express-sqlite-project
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

### Config
To change port, simply change `port` in main.ts

## Usage

### API Endpoints

Here are the available API endpoints and their descriptions:

- **Create a user:**
  - **POST** `/api/v1/post-user`
  - Request body: `{ "name": "string", "telephone": "string", "address": "string" }`
  - Response: `200 OK` or `400 Bad Request`

- **Get all users:**
  - **GET** `/api/v1/get-all-user`
  - Response: `200 OK` with all user data or `400 Bad Request`

- **Get user by ID:**
  - **GET** `/api/v1/get-user/:id`
  - Response: `200 OK` with user data or `400 Bad Request`

- **Get users by address:**
  - **GET** `/api/v1/get-user-with-address/:address`
  - Response: `200 OK` with user data or `400 Bad Request`

- **Get users by name:**
  - **GET** `/api/v1/get-user-with-name/:name`
  - Response: `200 OK` with user data or `400 Bad Request`

- **Get users by telephone:**
  - **GET** `/api/v1/get-user-with-telephone/:telephone`
  - Response: `200 OK` with user data or `400 Bad Request`

- **Update user by ID:**
  - **PUT** `/api/v1/update-user/:id`
  - Request body: `{ "name": "string", "telephone": "string", "address": "string" }`
  - Response: `200 OK` or `400 Bad Request`

- **Delete user by ID:**
  - **DELETE** `/api/v1/delete-user/:id`
  - Response: `200 OK` or `400 Bad Request`

### Running the Project

1. Start the Express server:
   ```sh
   npm run server
   ```

2. Open your browser or API client and access the endpoints listed above.


## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/index.html)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

