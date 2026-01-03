import app from "./app";

const PORT = process.env.PORT
  ? Number(process.env.PORT)
  : 4000;

const NODE_ENV = process.env.NODE_ENV || "development";

// Validate required environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error("ERROR: OPENAI_API_KEY is not set in environment variables");
  console.error("Please create a .env file with your OPENAI_API_KEY");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
  if (NODE_ENV === "development") {
    console.log(`API URL: http://localhost:${PORT}`);
  }
});
