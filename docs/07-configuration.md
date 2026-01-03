# Configuration Guide

Complete guide to configuring the AI Portfolio application.

## Environment Variables

### Backend Configuration (`apps/api/.env`)

#### Required Variables

**OPENAI_API_KEY**
- Description: Your OpenAI API key
- Example: `sk-...`
- How to get: [OpenAI Platform](https://platform.openai.com/api-keys)
- **Never commit this to git!**

**OPENAI_MODEL**
- Description: OpenAI model to use
- Default: `gpt-4o`
- Options: `gpt-4o`, `gpt-4-turbo`, `gpt-3.5-turbo`
- Note: Structured outputs work best with `gpt-4o` or `gpt-4-turbo`

#### Optional Variables

**PORT**
- Description: Server port
- Default: `4000`
- Example: `3000`, `8080`

**NODE_ENV**
- Description: Environment mode
- Default: `development`
- Options: `development`, `production`
- Affects: Error messages, logging, CORS

**FRONTEND_URL**
- Description: Frontend URL for CORS (production)
- Example: `https://yourdomain.com`
- Multiple URLs: `https://domain1.com,https://domain2.com`
- Default: `http://localhost:5173,http://localhost:3000` (development)

### Frontend Configuration (`apps/web/.env`)

#### Required Variables

**VITE_API_URL**
- Description: Backend API URL
- Development: `http://localhost:4000`
- Production: `https://api.yourdomain.com`
- Note: Must match backend PORT

#### Optional Variables

**VITE_NODE_ENV**
- Description: Environment mode
- Default: `development`
- Options: `development`, `production`

## User Information (`apps/api/src/data/user-info.json`)

### Structure

```json
{
  "personalInfo": {
    "name": "Your Name",
    "bio": "Your bio here",
    "image": "/profile.jpg",
    "location": "City, Country",
    "age": 30,
    "tagline": "Your tagline"
  },
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "year": 2024,
      "technologies": ["React", "TypeScript"],
      "links": [
        { "label": "GitHub", "url": "https://github.com/..." }
      ],
      "category": "Web Development"
    }
  ],
  "skills": [
    {
      "category": "Tech & Product",
      "skills": ["Skill 1", "Skill 2"]
    }
  ],
  "workExperience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "startDate": "2020-01",
      "endDate": "2024-12",
      "description": "Job description",
      "technologies": ["Tech 1", "Tech 2"]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree Name",
      "field": "Field of Study",
      "startDate": "2016",
      "endDate": "2020"
    }
  ],
  "contactInfo": {
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "City, Country",
    "socialLinks": [
      { "platform": "LinkedIn", "url": "https://linkedin.com/..." },
      { "platform": "GitHub", "url": "https://github.com/..." }
    ]
  },
  "funFacts": [
    "Fun fact 1",
    "Fun fact 2"
  ],
  "resume": {
    "name": "Your Name",
    "title": "Job Title",
    "format": "PDF",
    "updatedDate": "August 2024",
    "size": "0.5 MB",
    "url": "/resume.pdf"
  }
}
```

### Field Descriptions

#### personalInfo
- **name** (required): Your full name
- **bio** (required): Short biography
- **image** (optional): Path to profile image
- **location** (required): Your location
- **age** (optional): Your age
- **tagline** (optional): Short tagline

#### projects
- **title** (required): Project name
- **description** (required): Project description
- **year** (required): Year completed
- **technologies** (required): Array of technologies used
- **links** (optional): Array of {label, url} objects
- **category** (optional): Project category

#### skills
- **category** (required): Skill category name
- **skills** (required): Array of skill names

#### workExperience
- **company** (required): Company name
- **position** (required): Job title
- **startDate** (required): Start date (YYYY-MM format)
- **endDate** (optional): End date or "Present"
- **description** (required): Job description
- **technologies** (optional): Technologies used

#### education
- **institution** (required): School/university name
- **degree** (required): Degree name
- **field** (optional): Field of study
- **startDate** (required): Start year
- **endDate** (optional): End year or "Present"

#### contactInfo
- **email** (required): Email address
- **phone** (optional): Phone number
- **location** (required): Location
- **socialLinks** (optional): Array of {platform, url} objects

#### resume
- **name** (required): Name on resume
- **title** (required): Job title
- **format** (required): File format (usually "PDF")
- **updatedDate** (required): Last update date
- **size** (required): File size
- **url** (optional): Path to resume file

## Configuration Files

### TypeScript Configuration

#### Backend (`apps/api/tsconfig.json`)
- Target: ES2020
- Module: CommonJS
- Strict mode enabled

#### Frontend (`apps/web/tsconfig.json`)
- Target: ES2022
- Module: ESNext
- JSX: react-jsx

### Vite Configuration (`apps/web/vite.config.ts`)

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Tailwind Configuration

Uses Tailwind CSS v4 with Vite plugin. No separate config file needed.

## Production Configuration

### Backend Production

```env
NODE_ENV=production
PORT=4000
OPENAI_API_KEY=your_production_key
OPENAI_MODEL=gpt-4o
FRONTEND_URL=https://yourdomain.com
```

### Frontend Production

```env
VITE_API_URL=https://api.yourdomain.com
VITE_NODE_ENV=production
```

### Build Configuration

**Backend:**
```bash
cd apps/api
npm run build
# Output: dist/
```

**Frontend:**
```bash
cd apps/web
npm run build
# Output: dist/
```

## Security Considerations

### Environment Variables

1. **Never commit `.env` files**
2. **Use `.env.example` as template**
3. **Rotate API keys regularly**
4. **Use different keys for dev/prod**

### CORS Configuration

Production CORS should be restrictive:

```typescript
const corsOptions = {
  origin: process.env.FRONTEND_URL?.split(',') || [],
  credentials: true,
};
```

### API Key Security

- Store in environment variables
- Never expose in client-side code
- Use server-side only
- Consider API key rotation

## Validation

### Environment Variable Validation

The server validates required variables on startup:

```typescript
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERROR: OPENAI_API_KEY is not set");
  process.exit(1);
}
```

### User Info Validation

The user-info.json is validated when loaded. Ensure:
- Required fields are present
- Data types are correct
- URLs are valid (if applicable)

## Troubleshooting

### Environment Variables Not Loading

1. Check file is named `.env` (not `.env.example`)
2. Verify file is in correct directory
3. Restart server after changes
4. Check for typos in variable names

### CORS Errors

1. Verify `FRONTEND_URL` matches actual frontend URL
2. Check CORS configuration in `app.ts`
3. Ensure frontend URL includes protocol (`https://`)

### API Key Issues

1. Verify key is correct
2. Check account has credits
3. Verify model name is valid
4. Check rate limits

## See Also

- [Getting Started](./01-getting-started.md)
- [Deployment Guide](./08-deployment.md)
- [Troubleshooting](./10-troubleshooting.md)

