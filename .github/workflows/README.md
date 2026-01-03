# GitHub Actions Workflows

This directory contains CI/CD workflows for the AI Portfolio project.

## Workflows

### CI (`ci.yml`)

Main continuous integration workflow that runs on every push and pull request.

**Jobs:**
- `lint-and-test-api` - Lints and tests the API
- `lint-and-test-web` - Lints and tests the Web app
- `build` - Builds both applications
- `type-check` - Type checks both applications

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main` or `develop`

### Tests (`test.yml`)

Dedicated test workflow with matrix testing across Node.js versions.

**Jobs:**
- `test-api` - Tests API on Node.js 18 and 20
- `test-web` - Tests Web app on Node.js 18 and 20

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main` or `develop`
- Manual dispatch

### Deploy (`deploy.yml`)

Deployment workflow for production releases.

**Jobs:**
- `deploy-api` - Deploys API to production
- `deploy-web` - Deploys Web app to production

**Triggers:**
- Push to `main` branch
- Manual dispatch

## Required Secrets

Add these secrets in GitHub repository settings:

- `OPENAI_API_KEY` - OpenAI API key for testing
- `VITE_API_URL` - Production API URL (for web build)

## Optional Secrets

- Codecov token (if using Codecov for coverage)

## Customization

### Adding Deployment Steps

Edit `deploy.yml` and add your deployment commands:

**Railway:**
```yaml
- name: Deploy to Railway
  run: railway up
```

**Vercel:**
```yaml
- name: Deploy to Vercel
  run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

**AWS:**
```yaml
- name: Deploy to AWS
  run: |
    aws s3 sync dist/ s3://bucket-name
    aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DIST_ID }} --paths "/*"
```

## Status Badges

Add these badges to your README:

```markdown
![CI](https://github.com/yourusername/resume/workflows/CI/badge.svg)
![Tests](https://github.com/yourusername/resume/workflows/Tests/badge.svg)
```

