# Fullstack Project

This project is a fullstack web application developed with Java, Maven, Spring Boot, GitHub OAuth2, and MongoDB in the backend, and React in the frontend.

## Features
- User registration and login with GitHub OAuth2
- CRUD operations on data stored in MongoDB
- Frontend developed with React
- Backend APIs developed with Spring Boot

## Prerequisites
- Java and Maven
- Node.js and npm
- MongoDB Atlas account
- GitHub account for OAuth authentication

## Installation

### GitHub OAuth Configuration
1. Navigate to "Settings" > "Developer settings" > "OAuth Apps" in your GitHub account.
2. Click "New OAuth App", fill in the necessary details, and set `http://localhost:8080/login/oauth2/code/github` as the authorization callback URL.
3. After creation, note down the Client ID and Secret.


#### Database Setup
1. Sign up for MongoDB Atlas and create a cluster.
2. Create a `TicketScout` database and a `tickets` collection within it.



### Local Development
Set the following environment variables:

| Name                     | Description                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------|
| `OAUTH_GITHUB_ID`        | The Client ID from your GitHub OAuth application, used for user authentication.             |
| `OAUTH_GITHUB_SECRET`    | The Client Secret from your GitHub OAuth application, required for secure OAuth flows.      |
| `APP_URL`                | The base URL where your application is accessible, crucial for OAuth redirects.             |
| `MONGODB_URI`            | Your MongoDB Atlas connection string, enabling database access for your application.        |


### Backend
1. Clone the repository:
    ```bash
    git clone https://github.com/DerEns86/time-to-quit
    cd time-to-quit
    ```

2. Edit the configuration file:
    - Create an `application.properties` file in the `src/main/resources` directory.
    - Add the following configurations:
        ```properties
        spring.data.mongodb.uri=${MONGODB_URI}
        spring.security.oauth2.client.registration.github.client-id=${OAUTH_GITHUB_ID}
        spring.security.oauth2.client.registration.github.client-secret=${OAUTH_GITHUB_SECRET}
        app.url=${APP_URL}
        ```

3. Install dependencies and start the backend:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

### Frontend
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application:
    ```bash
    npm start
    ```

## CI/CD Configuration
Efficiently manage your CI/CD pipelines by setting up a production environment on GitHub and configuring the necessary secrets. These secrets are crucial for automating your deployment process and ensuring secure access to your DockerHub account and Render deployment triggers.

| Name                  | Description                                                                 |
|-----------------------|-------------------------------------------------------------------------------|
| `DOCKERHUB_USERNAME`  | The username for your DockerHub account, used to authenticate with DockerHub in CI/CD scripts.   |
| `DOCKERHUB_PASSWORD`  | The password for your DockerHub account, crucial for pushing and pulling Docker images securely. |
| `DOCKERHUB_TAG`       | The tag for your Docker image, typically specifying the version or environment. `latest` is recommended for continuous deployment. |
| `RENDER_DEPLOY`       | The URL or webhook to trigger deployment on Render, integrating your CI/CD pipeline with Render's hosting services.         |

Remember to also configure the environment variables from the "Local Development" section in your Render environment settings.

## Usage
- Open your browser and go to `http://localhost:5173` to see the application.
- Log in with your GitHub account to use the application's features.

