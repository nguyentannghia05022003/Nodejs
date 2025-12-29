import { swaggerAdminSpec } from './swagger.admin';
import { swaggerClientSpec } from './swagger.client';

export const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Project API',
    version: '1.0.0',
    description: 'API documentation',
  },
  servers: [{ url: '/api' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Admin: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          email: { type: 'string', example: 'admin@example.com' },
          fullName: { type: 'string', example: 'Administrator' },
          phone: { type: 'string', example: '0900000000' },
          avatar: { type: 'string', nullable: true, example: 'abcd.jpg' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      ApiResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          statusCode: { type: 'integer' },
          message: { type: 'string' },
          data: {},
          meta: {
            type: 'object',
            properties: {
              page: { type: 'integer' },
              limit: { type: 'integer' },
              total: { type: 'integer' },
              totalPages: { type: 'integer' },
            },
          },
        },
      },
      CreateAdmin: {
        type: 'object',
        required: ['email', 'password', 'fullName', 'phone'],
        properties: {
          email: { type: 'string', example: 'admin@example.com' },
          password: { type: 'string', example: 'admin123' },
          fullName: { type: 'string', example: 'Nguyen Van A' },
          phone: { type: 'string', example: '0912345678' },
        },
      },
      UpdateAdmin: {
        type: 'object',
        properties: {
          fullName: { type: 'string' },
          phone: { type: 'string' },
        },
      },
      ResetPassword: {
        type: 'object',
        required: ['newPassword'],
        properties: { newPassword: { type: 'string', example: 'newpass123' } },
      },
      AdminLogin: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', example: 'admin@gmail.com' },
          password: { type: 'string', example: 'admin123' },
        },
      },
      ClientRegister: {
        type: 'object',
        required: ['email', 'password', 'fullName'],
        properties: {
          email: { type: 'string', format: 'email', example: 'customer@example.com' },
          password: { type: 'string', minLength: 6, example: 'password123' },
          fullName: { type: 'string', example: 'Nguyen Van A' },
          phone: { type: 'string', example: '0912345678' },
        },
      },
      ClientLogin: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', example: 'customer@example.com' },
          password: { type: 'string', example: 'password123' },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          tokenExpires: { type: 'integer', example: 1234567890 },
          admin: { $ref: '#/components/schemas/Admin' },
          customer: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              email: { type: 'string', example: 'customer@example.com' },
              fullName: { type: 'string', example: 'Nguyen Van A' },
              phone: { type: 'string', example: '0912345678' },
              avatar: { type: 'string', nullable: true },
              createdAt: { type: 'integer', example: 1234567890 },
              updatedAt: { type: 'integer', example: 1234567890 },
            },
          },
        },
      },
      UpdateProfile: {
        type: 'object',
        properties: {
          fullName: { type: 'string', example: 'Nguyen Van B' },
          phone: { type: 'string', example: '0987654321' },
        },
      },
      ChangePassword: {
        type: 'object',
        required: ['oldPassword', 'newPassword'],
        properties: {
          oldPassword: { type: 'string', example: 'oldpass123' },
          newPassword: { type: 'string', minLength: 6, example: 'newpass123' },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    ...swaggerAdminSpec.paths,
    ...swaggerClientSpec.paths,
  },
};

