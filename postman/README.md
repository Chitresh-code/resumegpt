# Postman Collection

This directory contains Postman collections and environments for testing the AI Portfolio API.

## Files

- **AI-Portfolio.postman_collection.json** - Complete API collection with all endpoints
- **Development.postman_environment.json** - Development environment variables
- **Production.postman_environment.json** - Production environment variables

## Importing into Postman

### Method 1: Import Files

1. Open Postman
2. Click **Import** button
3. Select the collection file: `AI-Portfolio.postman_collection.json`
4. Select the environment file: `Development.postman_environment.json` or `Production.postman_environment.json`
5. Click **Import**

### Method 2: Import from Directory

1. Open Postman
2. Click **Import** button
3. Select **Folder** option
4. Select the `postman` directory
5. All files will be imported

## Using the Collection

### Setting Up Environment

1. After importing, select the environment from the dropdown (top right)
2. Choose **Development** for local testing
3. Choose **Production** for production API testing

### Updating Environment Variables

1. Click the **Environments** tab (left sidebar)
2. Select the environment you want to edit
3. Update variables as needed:
   - `base_url` - API base URL
   - `api_key` - API key (if authentication is added)

### Running Requests

1. Open the collection
2. Select a request
3. Click **Send**
4. View response in the bottom panel

### Running Tests

All requests include automated tests. To run all tests:

1. Click on the collection name
2. Click **Run** button
3. Select requests to test
4. Click **Run AI Portfolio API**
5. View test results

## Collection Structure

### Health
- **Health Check** - Verify API is running

### Chat
- **Send Chat Message** - Basic chat request
- **Chat - Ask About Projects** - Test structured project output
- **Chat - Ask About Skills** - Test structured skill output
- **Chat - Ask About Contact** - Test structured contact output
- **Chat - With Conversation History** - Test context handling
- **Chat - Error: Missing Message** - Test error handling
- **Chat - Error: Message Too Long** - Test validation

## Environment Variables

### Development
- `base_url`: `http://localhost:4000`
- `api_key`: (empty, set if needed)
- `long_message`: Long message for testing validation

### Production
- `base_url`: `https://api.yourdomain.com` (update with your domain)
- `api_key`: (empty, set if needed)
- `long_message`: Long message for testing validation

## Notes

- SSE (Server-Sent Events) responses will show as streaming data in Postman
- Some tests may need adjustment based on your actual API responses
- Update environment variables before running requests
- The collection includes pre-request and test scripts for automation

