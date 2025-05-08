/** @type {import ("drizzle-kit").Config} */

export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_F7rLwS6poBVI@ep-steep-glitter-a4kpgsdt-pooler.us-east-1.aws.neon.tech/PrepWise?sslmode=require',
  },
};
