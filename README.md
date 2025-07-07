# WTWR (What to Wear?) - Backend API

## Overview
The backend API for WTWR (What to Wear?) application - a weather-based clothing recommendation service. This RESTful API handles user authentication, clothing item management, and weather-based recommendations.

## Technologies & Techniques Used

### Core Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling library

### Security & Authentication
- **JWT (JSON Web Tokens)** - Secure user authentication
- **bcryptjs** - Password hashing and encryption
- **helmet** - Security middleware for HTTP headers
- **express-rate-limit** - Rate limiting middleware

### Validation & Error Handling
- **Joi** - Schema validation library
- **Celebrate** - Express middleware for Joi validation
- **validator** - String validation and sanitization
- **Custom Error Classes** - Centralized error handling system

### Logging & Monitoring
- **Winston** - Professional logging library
- **express-winston** - Express middleware for Winston
- **Request/Error Logging** - Comprehensive logging system

### Development & Code Quality
- **ESLint** - Code linting with Airbnb configuration
- **Prettier** - Code formatting
- **Nodemon** - Development server with hot reload
- **dotenv** - Environment variable management

### Deployment & Process Management
- **PM2** - Production process manager
- **Nginx** - Reverse proxy and web server
- **SSL/TLS** - HTTPS encryption with Let's Encrypt
- **Google Cloud Platform** - Cloud hosting

## Features

### User Management
- User registration and authentication
- Secure password hashing
- JWT-based session management
- User profile management

### Clothing Items
- CRUD operations for clothing items
- Image URL validation
- Weather-based filtering
- Like/unlike functionality

### Security Features
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Centralized error handling
- Request/response logging

## API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /signin` - User login

### Users
- `GET /users/me` - Get current user info
- `PATCH /users/me` - Update user profile

### Clothing Items
- `GET /items` - Get all clothing items
- `POST /items` - Create new clothing item
- `DELETE /items/:itemId` - Delete clothing item
- `PUT /items/:itemId/likes` - Like item
- `DELETE /items/:itemId/likes` - Unlike item

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Local Development
```bash
# Clone the repository
git clone [your-repo-url]
cd se_project_express

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Run linting
npm run lint
```
## Deployment
### Production Setup
- Server: Google Cloud Platform VM
- Process Manager: PM2 for process management
- Web Server: Nginx as reverse proxy
- SSL: Let's Encrypt certificates
- Domain: Custom domain with SSL encryption

### Deployment Commands
```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start app.js --name "wtwr-backend"

# Configure Nginx
sudo nano /etc/nginx/sites-available/default

# Obtain SSL certificate
sudo certbot --nginx -d api.yourdomain.com
```
The application is deployed and accessible at:
- Backend API: https://api.wtwrmofesdo.jumpingcrab.com
- Frontend: https://wtwrmofesdo.jumpingcrab.

## Project Structure
```
├── controllers/          # Route handlers
├── middlewares/         # Custom middleware
├── models/             # Mongoose schemas
├── routes/             # Route definitions
├── utils/             # Custom error classes