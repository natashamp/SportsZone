## Clone the repository

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/natashamp/SportsZone.git
   ```

## Database Setup

To set up and start the database using a PostgreSQL Docker image, follow these steps:

1. Install Docker on your machine if you haven't already. You can download Docker from the official website: [https://www.docker.com/get-started](https://www.docker.com/get-started).

2. Navigate to the backend directory:

   ```shell
   cd SportsZone/backend/node-express-postgresql-server/
   ```

3. Start the PostgreSQL container using Docker Compose:

   ```shell
   docker-compose up -d
   ```

   This will start the PostgreSQL container in the background.

4. Verify that the PostgreSQL container is running by executing the following command:

   ```shell
   docker ps
   ```

   You should see the `postgres:14.2-alpine` container listed in the output.

5. Connect to the PostgreSQL database using a PostgreSQL client tool (e.g., `psql`, `pgAdmin`, or any other tool of your choice) using the following connection details:

   - Host: `localhost` or `127.0.0.1`
   - Port: `5432`
   - Username: `postgres`
   - Password: `postgres`
   - Database: `mydatabase`

   example:
   `psql -h 127.0.0.1 -p 5432 mydatabase postgres`

Congratulations! You have successfully set up and started the PostgreSQL database using Docker Compose. You can now proceed with the backend server setup.

## Backend Server Setup

To set up and start the backend server, follow these steps:

1. Navigate to the project directory:

   ```shell
   cd SportsZone/backend/node-express-postgresql-server/
   ```

2. Install the required dependencies using a package manager such as npm or yarn:

   ```shell
   npm install
   ```

3. Start the backend server:

   ```shell
   npm start
   ```

   This will start the server on the specified port (e.g., 3000).

4. You should see a message indicating that the server is running:

   ```plaintext
   Server started on port 3000
   ```

Congratulations! You have successfully set up and started the backend server for the Intramural Sports Maker project.

## React Server Setup

To set up and start the React server in the `react-web-server` directory, follow these steps:

1.  Navigate to the `react-web-server` directory:

    ```shell
    cd SportsZone/react-web-server/sportsmaker
    ```

2.  Install the required dependencies using a package manager such as npm or yarn:

    ```shell
    npm install
    ```

3.  Start the React server:

    ```shell
    PORT=8080 npm start
    ```

    This will start the server on the specified port (e.g., 8080).

4.  You should see a message indicating that the server is running:

        ```plaintext
        React server started on port 8080
        ```

    Congratulations! You have successfully set up and started the React server in the `react-web-server` directory.

## Using the App at localhost Port 8080

To use the app at localhost port 8080, follow these steps:

1. Make sure you have completed the database setup and backend server setup as mentioned in the previous sections.

2. Open your web browser and navigate to [http://localhost:8080](http://localhost:8080).

3. You should see the app interface loaded in your browser.

4. Interact with the app:
   - To register a player (yourself)
   - Join a sports team
   - Create a new team
   - Message your teammates in the chat rooms

Congratulations! You are now using the app at localhost port 8080.
