# Intern Manager

A simple CRUD application built with Vue.js and Vuetify to manage a group of interns. The application allows users to add, edit, delete, and view intern information.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [License](#license)

## Features

- Add new interns with first name, last name, and a photo.
- Display a paginated list of interns.
- Edit and delete existing intern records.
- Search functionality to filter interns by name.

## Technologies Used

- **Vue.js**: A progressive JavaScript framework for building user interfaces.
- **Vuetify**: A Material Design component framework for Vue.js.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Axios**: Promise-based HTTP client for making API requests.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JanKrysztop/intern-manger.git
   cd intern_manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Run the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Endpoints

This application interacts with the [Reqres API](https://reqres.in/) to manage intern data. The following endpoints are used:

- **GET /api/users**: Retrieve a list of users.
- **POST /api/users**: Create a new user.
- **PUT /api/users/{id}**: Update an existing user.
- **DELETE /api/users/{id}**: Delete a user.

### Example Usage

To create a new intern, the application sends a POST request to `/api/users` with the following payload:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "avatar": "https://example.com/photo.jpg"
}
```

## Deployment

To deploy this application on GitHub Pages, follow these steps:

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:

   ```bash
   npm run deploy
   ```

Access the deployed application at:

```
https://intern-manager-nine.vercel.app/
```

