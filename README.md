# ResumeGPT

**ResumeGPT** is an AI-powered interactive portfolio and resume platform that transforms the traditional resume into an engaging, conversational experience. Built with cutting-edge AI technology, ResumeGPT allows visitors to have natural conversations about your work, skills, and experience, making your portfolio come alive through intelligent dialogue.

Instead of static pages and PDFs, ResumeGPT creates an interactive experience where potential employers, clients, or collaborators can chat with an AI assistant that represents you. The AI understands your background, projects, and expertise, providing personalized responses and dynamically rendering beautiful cards and components based on the conversation.

## What Makes ResumeGPT Special?

- 🤖 **AI-Powered Conversations** - Natural language interactions powered by OpenAI GPT models
- 🎨 **Beautiful Interactive UI** - Fluid cursor animations, colorful glass-effect cards, and modern design
- 📊 **Dynamic Content Rendering** - Projects displayed in interactive carousels with detailed drawers
- 💬 **Streaming Responses** - Real-time message streaming for a smooth chat experience
- 🎯 **Structured Data** - Intelligent card rendering for projects, skills, contact info, and more
- 🚀 **Production Ready** - Docker support, comprehensive testing, and CI/CD pipelines

## Features

- 🎨 **Beautiful Home Page** - Fluid cursor animation and preview cards
- 💬 **AI Chat Interface** - Powered by LangChain and OpenAI with streaming responses
- 🎯 **Structured Outputs** - Dynamic component rendering (Project cards, Skill cards, Contact cards, etc.)
- 📱 **Responsive Design** - Modern, clean UI with Tailwind CSS
- ⚡ **Real-time Streaming** - Server-Sent Events (SSE) for live message updates
- 🔧 **Type-Safe** - Full TypeScript support

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- ai-elements (streamdown.io)
- shadcn/ui

### Backend
- Node.js
- Express
- TypeScript
- LangChain
- OpenAI API
- Zod (schema validation)

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- OpenAI API Key

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd resume
```

### 2. Install dependencies

Install dependencies for each app separately:

```bash
# Install API dependencies
cd apps/api && npm install

# Install Web dependencies
cd apps/web && npm install
```

### 3. Set up environment variables

#### Backend (apps/api/.env)
```bash
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o
PORT=4000
NODE_ENV=development
```

#### Frontend (apps/web/.env)
```bash
cp apps/web/.env.example apps/web/.env
```

Edit `apps/web/.env`:
```
VITE_API_URL=http://localhost:4000
VITE_NODE_ENV=development
```

### 4. Update user information

Edit `apps/api/src/data/user-info.json` with your personal information, projects, skills, etc.

### 5. Run the development servers

Run each app in a separate terminal:

**Terminal 1 - API:**
```bash
cd apps/api
npm run dev
```

**Terminal 2 - Web:**
```bash
cd apps/web
npm run dev
```

The API will run on `http://localhost:4000` and the web app on `http://localhost:5173`.

## Available Scripts

### API (apps/api)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run start:prod` - Start production server with NODE_ENV=production

### Web (apps/web)
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
resume/
├── apps/
│   ├── api/                 # Backend API
│   │   ├── src/
│   │   │   ├── controllers/ # Route controllers
│   │   │   ├── routes/      # Express routes
│   │   │   ├── services/    # Business logic (LLM, context)
│   │   │   ├── schemas/     # Zod schemas for structured outputs
│   │   │   ├── data/        # user-info.json
│   │   │   └── types/       # TypeScript types
│   │   └── .env.example
│   │
│   └── web/                 # Frontend React app
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── pages/       # Page components
│       │   ├── hooks/       # Custom React hooks
│       │   ├── types/       # TypeScript types
│       │   └── routes/      # React Router config
│       └── .env.example
│
├── package.json             # Root package.json with workspace scripts
└── README.md
```

## Production Deployment

### Build for production

```bash
# Build API
cd apps/api
npm run build

# Build Web
cd apps/web
npm run build
```

### Environment Variables for Production

**Backend:**
- Set `NODE_ENV=production`
- Ensure `OPENAI_API_KEY` is set
- Set `PORT` to your desired port (default: 4000)

**Frontend:**
- Set `VITE_API_URL` to your production API URL
- Set `VITE_NODE_ENV=production`

### Running in Production

```bash
# API
cd apps/api
npm run start:prod

# Web (serve the built files with a static server)
cd apps/web
npm run preview
```

## Customization

### Update Portfolio Data

Edit `apps/api/src/data/user-info.json` with:
- Personal information
- Projects
- Skills
- Work experience
- Education
- Contact information
- Resume details

### Customize Components

All card components are in `apps/web/src/components/cards/`:
- `ProjectCard.tsx` - Project display
- `SkillCard.tsx` - Skills display
- `ContactCard.tsx` - Contact information
- `ResumeCard.tsx` - Resume download
- `InfoCard.tsx` - General information cards

### Modify Structured Outputs

Edit `apps/api/src/schemas/structured-output.schema.ts` to add new card types or modify existing ones.

## Troubleshooting

### API not connecting
- Check that the API server is running on port 4000
- Verify `VITE_API_URL` in `apps/web/.env` matches your API URL
- Check CORS settings in `apps/api/src/app.ts`

### OpenAI API errors
- Verify your `OPENAI_API_KEY` is set correctly
- Check your OpenAI account has sufficient credits
- Ensure the model name in `.env` is valid (e.g., `gpt-4o`, `gpt-4-turbo`)

### Build errors
- Run `npm run clean` and reinstall dependencies
- Check Node.js version (>= 18.0.0)
- Verify all environment variables are set

## Testing

The project includes comprehensive test suites for both backend and frontend.

### Running Tests

**Backend:**
```bash
cd apps/api
npm test
```

**Frontend:**
```bash
cd apps/web
npm run test:run
```

See [TESTING.md](./TESTING.md) and [TESTING_AND_CI.md](./TESTING_AND_CI.md) for detailed testing documentation.

## CI/CD

GitHub Actions workflows are configured for:
- Automated testing on push/PR
- Linting and type checking
- Build verification
- Deployment (on main branch)

See [.github/workflows/README.md](./.github/workflows/README.md) for workflow details.

## Postman Collection

A complete Postman collection is available in the `postman/` directory for API testing.

See [postman/README.md](./postman/README.md) for import instructions.

## License

ISC License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Before contributing:
1. Run tests: `npm test` in both apps
2. Run linter: `npm run lint`
3. Ensure all tests pass
4. Follow the coding standards in [docs/09-development.md](./docs/09-development.md)

