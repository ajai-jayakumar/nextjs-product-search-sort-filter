## Prerequisites

- Ensure you have the Docker Desktop application installed on your machine.

## Getting Started

Follow these steps to set up and run the application:

1. **Start the Docker Containers**: Launch the Next.js and PostgreSQL containers by executing the following command in your terminal:

   ```bash
   docker compose up
   ```

   This command initializes the Docker containers. You can stop the containers at any time by pressing `Ctrl + C` (Windows/Linux) or `Cmd + C` (Mac). Alternatively, you can manage the containers directly through the Docker Desktop application.

2. **Run Database Migrations**: To apply the necessary database migrations, execute:

   ```bash
   npm run db:migrate
   ```

3. **Seed the Database**: Populate the database with initial data by running:

   ```bash
   npm run db:seed
   ```

4. **Access the Application**: Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

5. **Optional - View the Database**: If you wish to inspect the database, you can run the following command:

   ```bash
   npm run db:studio
   ```

   This will open the database studio for easier management and visualization of your data.
