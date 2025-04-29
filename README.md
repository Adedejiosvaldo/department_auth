# NestJS GraphQL API with Authentication

## Description

A robust backend API built with NestJS, GraphQL, TypeORM, and PostgreSQL. Features include JWT-based authentication and CRUD operations for managing departments and sub-departments.

## Table of Contents

- [Technical Stack](#technical-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security Considerations](#security-considerations)

## Technical Stack

- **Framework:** NestJS
- **API:** GraphQL
- **ORM:** TypeORM
- **Database:** PostgreSQL
- **Language:** TypeScript
- **Authentication:** JWT (JSON Web Tokens)

## Features

- **Authentication:** Secure user login using JWT.
- **Authorization:** Protected GraphQL resolvers/mutations.
- **Department Management:** Full CRUD operations (Create, Read, Update, Delete) for departments.
- **Sub-Department Management:** Support for hierarchical data structures (departments containing sub-departments).
- **Validation:** Input validation for GraphQL operations.

## Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- PostgreSQL Server
- Git

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Adedejiosvaldo/department_auth
    cd department_auth
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Environment Variables

A `.env` file should be created in the root directory with the following environment variables. The placeholder values should be replaced with actual configuration.

```env
# Application Port
PORT=3000

# Database Configuration
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name

# JWT Configuration
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRATION_TIME=3600s # e.g., 1 hour

# Add any other environment-specific variables here
```

**Important:** The `JWT_SECRET` should be a complex, unique string and kept confidential.

## Running the Application

1.  **Start the development server:**

    ```bash
    npm run start:dev
    # or
    yarn start:dev
    ```

    The application will run on the port specified in the `.env` file (default: `http://localhost:3000`).

2.  **Build for production:**

    ```bash
    npm run build
    ```

3.  **Run in production mode:**
    ```bash
    npm run start:prod
    ```

## API Documentation

Once the application is running, the GraphQL Playground can be accessed in a browser:

`http://localhost:<PORT>/graphql` (replace `<PORT>` with the application's port)

The Playground provides an interactive environment to explore the GraphQL schema, run queries, and execute mutations.

### Example Operations

_(Refer to the GraphQL Schema section or explore via the Playground for detailed operations like `login`, `createDepartment`, `getDepartments`, etc.)_

## Testing

The test suite can be run using:

```bash
npm test
# or
yarn test
```

## Deployment

This application is configured for deployment on platforms like Render.com.

**Requirements:**

- A provisioned PostgreSQL database accessible by the deployment environment.
- Configuration of environment variables (as listed in the [Environment Variables](#environment-variables) section) within the deployment platform's settings.
- Build command: `npm run build` (or `yarn build`)
- Start command: `npm run start:prod` (or `yarn start:prod`)
