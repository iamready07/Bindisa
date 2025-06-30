# Bindisa Agritech Backend API

A comprehensive Node.js/Express backend for the Bindisa Agritech application, providing APIs for agricultural technology solutions.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with refresh tokens
- **User Management**: Role-based access control (User, Farmer, Expert, Admin)
- **Soil Analysis**: Comprehensive soil testing and recommendation system
- **Real-time Chat**: Socket.IO-powered chatbot and expert consultation
- **File Upload**: Cloudinary integration for images and documents
- **Multi-language Support**: Support for English, Hindi, and Marathi
- **Email Services**: Nodemailer for notifications and verification
- **Security**: Rate limiting, CORS, helmet, input validation
- **Analytics**: User activity and system performance tracking

## 📁 Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── soilController.js    # Soil analysis operations
│   ├── chatController.js    # Chat and messaging
│   └── ...                  # Other controllers
├── middleware/
│   ├── auth.js              # Authentication middleware
│   ├── errorHandler.js      # Global error handling
│   └── validation.js        # Input validation
├── models/
│   ├── User.js              # User schema
│   ├── SoilAnalysis.js      # Soil analysis schema
│   ├── Chat.js              # Chat schema
│   └── ...                  # Other models
├── routes/
│   ├── auth.js              # Auth routes
│   ├── soil.js              # Soil analysis routes
│   ├── chat.js              # Chat routes
│   └── ...                  # Other routes
├── utils/
│   ├── response.js          # Response formatting
│   ├── jwt.js               # JWT utilities
│   ├── validation.js        # Validation helpers
│   └── email.js             # Email utilities
├── .env.example             # Environment variables template
├── package.json             # Dependencies
└── server.js                # Main server file
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### 1. Clone & Install

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### 2. Environment Configuration

Edit `.env` file with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/bindisa-agritech

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_REFRESH_EXPIRES_IN=30d

# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@bindisa-agritech.com

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Database Setup

```bash
# Make sure MongoDB is running
sudo systemctl start mongodb

# Optional: Seed database with sample data
npm run seed
```

### 4. Start Development Server

```bash
# Start in development mode (with nodemon)
npm run dev

# Or start in production mode
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| POST   | `/api/auth/register`        | Register new user      |
| POST   | `/api/auth/login`           | Login user             |
| POST   | `/api/auth/logout`          | Logout user            |
| POST   | `/api/auth/refresh-token`   | Refresh access token   |
| POST   | `/api/auth/verify-email`    | Verify email address   |
| POST   | `/api/auth/forgot-password` | Request password reset |
| POST   | `/api/auth/reset-password`  | Reset password         |
| GET    | `/api/auth/me`              | Get current user       |

### User Management

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| GET    | `/api/users/profile`         | Get user profile    |
| PUT    | `/api/users/profile`         | Update user profile |
| POST   | `/api/users/change-password` | Change password     |
| GET    | `/api/users/farmers`         | Get farmers list    |

### Soil Analysis

| Method | Endpoint                    | Description           |
| ------ | --------------------------- | --------------------- |
| POST   | `/api/soil/analysis`        | Submit soil sample    |
| GET    | `/api/soil/analysis`        | Get user's analyses   |
| GET    | `/api/soil/analysis/:id`    | Get specific analysis |
| PUT    | `/api/soil/analysis/:id`    | Update analysis       |
| POST   | `/api/soil/recommendations` | Get recommendations   |

### Chat & Messaging

| Method | Endpoint                       | Description       |
| ------ | ------------------------------ | ----------------- |
| GET    | `/api/chat/sessions`           | Get chat sessions |
| POST   | `/api/chat/message`            | Send message      |
| GET    | `/api/chat/history/:sessionId` | Get chat history  |
| PUT    | `/api/chat/read/:messageId`    | Mark as read      |

### File Upload

| Method | Endpoint                | Description     |
| ------ | ----------------------- | --------------- |
| POST   | `/api/upload/image`     | Upload image    |
| POST   | `/api/upload/document`  | Upload document |
| DELETE | `/api/upload/:publicId` | Delete file     |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

### Access Tokens

- Short-lived (15 minutes by default)
- Include user ID, email, and role
- Sent in Authorization header: `Bearer <token>`

### Refresh Tokens

- Long-lived (30 days by default)
- Stored in httpOnly cookies
- Used to generate new access tokens

### Example Usage

```javascript
// Login
const response = await fetch("/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "farmer@example.com",
    password: "password123",
  }),
  credentials: "include", // Include cookies
});

const { data } = await response.json();
const { accessToken } = data;

// Use token for protected routes
const protectedResponse = await fetch("/api/users/profile", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

## 🛡️ Security Features

- **Rate Limiting**: Prevent brute force attacks
- **CORS**: Cross-origin request protection
- **Helmet**: Security headers
- **Input Validation**: Joi-based validation
- **SQL Injection Protection**: Mongoose ODM
- **XSS Protection**: Input sanitization
- **Password Hashing**: bcrypt with salt rounds

## 📧 Email Templates

The system includes email templates for:

- **Welcome Email**: User registration confirmation
- **Email Verification**: Account activation
- **Password Reset**: Secure password recovery
- **Soil Report**: Analysis results
- **Notifications**: System alerts and updates

## 🌐 Multi-language Support

API responses can be localized based on the `x-lang` header:

```javascript
fetch("/api/some-endpoint", {
  headers: {
    "x-lang": "hi", // 'en', 'hi', 'mr'
  },
});
```

## 📊 Database Models

### User Model

```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: Enum['user', 'farmer', 'expert', 'admin'],
  farmDetails: {
    farmName: String,
    farmSize: { value: Number, unit: String },
    cropTypes: [Object],
    soilType: String
  },
  preferences: {
    language: String,
    notifications: Object
  }
}
```

### Soil Analysis Model

```javascript
{
  user: ObjectId,
  sampleId: String,
  location: {
    coordinates: [Number], // [longitude, latitude]
    address: Object
  },
  physicalProperties: {
    texture: { sand: Number, silt: Number, clay: Number },
    structure: String,
    color: Object
  },
  chemicalProperties: {
    pH: Number,
    nutrients: {
      nitrogen: Object,
      phosphorus: Object,
      potassium: Object
    }
  },
  recommendations: [Object]
}
```

## 🔧 Environment Variables

| Variable                | Description               | Default     |
| ----------------------- | ------------------------- | ----------- |
| `NODE_ENV`              | Environment mode          | development |
| `PORT`                  | Server port               | 5000        |
| `MONGODB_URI`           | MongoDB connection string | -           |
| `JWT_SECRET`            | JWT signing secret        | -           |
| `SMTP_HOST`             | Email server host         | -           |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name     | -           |

## 🚀 Deployment

### Production Checklist

1. Set `NODE_ENV=production`
2. Use strong JWT secrets
3. Configure HTTPS
4. Set up MongoDB Atlas or production DB
5. Configure email service (SendGrid, etc.)
6. Set up Cloudinary for file uploads
7. Configure Redis for session storage (optional)
8. Set up monitoring and logging

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 API Response Format

All API responses follow a consistent format:

### Success Response

```javascript
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": { /* response data */ },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response

```javascript
{
  "status": "error",
  "message": "Error description",
  "details": "Additional error details",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Paginated Response

```javascript
{
  "status": "success",
  "message": "Data fetched successfully",
  "data": [/* array of items */],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test auth.test.js
```

## 📈 Monitoring & Logging

- **Request Logging**: Morgan middleware for HTTP request logging
- **Error Tracking**: Comprehensive error handling and logging
- **Performance Monitoring**: Built-in analytics for API usage
- **Health Checks**: `/health` endpoint for system status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For technical support or questions:

- Email: support@bindisa-agritech.com
- GitHub Issues: [Create an issue](https://github.com/bindisa-agritech/backend/issues)

---

Built with ❤️ for sustainable agriculture technology.
