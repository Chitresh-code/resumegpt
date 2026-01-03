# Getting Started

This guide will help you set up and run the AI Portfolio project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/api-keys)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd resume
```

### 2. Install API Dependencies

```bash
cd apps/api
npm install
```

### 3. Install Web Dependencies

```bash
cd ../web
npm install
```

### 4. Configure Environment Variables

#### Backend Configuration

Create `apps/api/.env` from the example:

```bash
cd apps/api
cp .env.example .env
```

Edit `apps/api/.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o
PORT=4000
NODE_ENV=development
```

**Important:** Replace `your_openai_api_key_here` with your actual OpenAI API key.

#### Frontend Configuration

Create `apps/web/.env` from the example:

```bash
cd apps/web
cp .env.example .env
```

Edit `apps/web/.env`:

```env
VITE_API_URL=http://localhost:4000
VITE_NODE_ENV=development
```

### 5. Update User Information

Edit `apps/api/src/data/user-info.json` with your personal information:

```json
{
  "personalInfo": {
    "name": "Your Name",
    "bio": "Your bio here",
    ...
  },
  "projects": [...],
  "skills": [...],
  ...
}
```

See [Configuration Guide](./07-configuration.md) for detailed information about the user-info.json structure.

## Running the Application

### Development Mode

You need to run both the API and Web servers in separate terminals.

#### Terminal 1 - API Server

```bash
cd apps/api
npm run dev
```

The API will start on `http://localhost:4000`

#### Terminal 2 - Web Server

```bash
cd apps/web
npm run dev
```

The web app will start on `http://localhost:5173` (or another port if 5173 is busy)

### Verify Installation

1. Open `http://localhost:5173` in your browser
2. You should see the home page with your profile information
3. Try asking a question in the chat interface
4. Check the API logs in Terminal 1 for any errors

## First Steps

1. **Customize Your Profile**
   - Update `apps/api/src/data/user-info.json` with your information
   - Add your projects, skills, and contact details

2. **Test the Chat**
   - Navigate to the chat page
   - Ask questions like:
     - "Who are you?"
     - "Tell me about your projects"
     - "What are your skills?"
     - "How can I contact you?"

3. **Explore Components**
   - Check how structured outputs render as cards
   - See how different queries trigger different component types

## Next Steps

- Read [Architecture Overview](./02-architecture.md) to understand the system
- Review [Development Guide](./09-development.md) for development workflow
- Check [API Documentation](./03-api-documentation.md) for backend details
- See [Frontend Guide](./04-frontend-guide.md) for component structure

## Common Issues

If you encounter issues during setup, see [Troubleshooting Guide](./10-troubleshooting.md).

### Quick Fixes

**Port already in use:**
- Change `PORT` in `apps/api/.env`
- Update `VITE_API_URL` in `apps/web/.env` to match

**OpenAI API errors:**
- Verify your API key is correct
- Check your OpenAI account has credits
- Ensure the model name is valid (e.g., `gpt-4o`, `gpt-4-turbo`)

**Dependencies not installing:**
- Clear cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then reinstall

## Support

For more help, check:
- [Troubleshooting Guide](./10-troubleshooting.md)
- [Development Guide](./09-development.md)
- Project [README.md](../README.md)

