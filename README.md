# SE713 Lab 04 Prisma Project

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Prisma CLI

## Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/se713_lab04_prisma_project.git
   cd se713_lab04_prisma_project
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the database:

   ```sh
   npx prisma migrate dev --name init
   ```

4. Generate Prisma Client:

   ```sh
   npx prisma generate
   ```

## Running the Project

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Prisma Studio

To view and manage your database with Prisma Studio, run:

```sh
npx prisma studio
```

## Environment Variables

Make sure to set up your `.env` file with the necessary environment variables. Example:

```
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

## Learn More

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [npm Documentation](https://docs.npmjs.com/)
