export const swaggerClientSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Client API',
    version: '1.0.0',
    description: 'API documentation cho Client',
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
          avatar: { type: 'string', example: 'avatar.jpg' },
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
      Category: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          categoryCode: { type: 'string', example: 'CAT-001' },
          name: { type: 'string', example: 'Điện thoại' },
          isDeleted: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'iPhone 15' },
          image: { type: 'string', example: 'iphone15.jpg' },
          description: { type: 'string', example: 'Mô tả sản phẩm' },
          price: { type: 'number', example: 20000000 },
          categoryCode: { type: 'string', example: 'CAT-001' },
          isDeleted: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          orderCode: { type: 'string', example: 'ORD-001' },
          totalAmount: { type: 'number', example: 50000000 },
          status: { type: 'string', example: 'PENDING' },
          isDeleted: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      OrderItem: {
        type: 'object',
        properties: {
          productId: { type: 'integer', example: 1 },
          quantity: { type: 'integer', example: 2 },
        },
      },
      CreateOrder: {
        type: 'object',
        required: ['orderCode', 'totalAmount', 'items'],
        properties: {
          orderCode: { type: 'string', example: 'ORD-001' },
          totalAmount: { type: 'number', example: 50000000 },
          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/OrderItem' },
          },
        },
      },
      OrderSummary: {
        type: 'object',
        properties: {
          PENDING: {
            type: 'object',
            properties: {
              count: { type: 'integer', example: 5 },
              totalAmount: { type: 'number', example: 100000000 },
            },
          },
          CONFIRMED: {
            type: 'object',
            properties: {
              count: { type: 'integer', example: 3 },
              totalAmount: { type: 'number', example: 60000000 },
            },
          },
          SHIPPING: {
            type: 'object',
            properties: {
              count: { type: 'integer', example: 2 },
              totalAmount: { type: 'number', example: 40000000 },
            },
          },
          DELIVERED: {
            type: 'object',
            properties: {
              count: { type: 'integer', example: 10 },
              totalAmount: { type: 'number', example: 200000000 },
            },
          },
          CANCELLED: {
            type: 'object',
            properties: {
              count: { type: 'integer', example: 1 },
              totalAmount: { type: 'number', example: 20000000 },
            },
          },
        },
      },
      UploadResponse: {
        type: 'object',
        properties: {
          url: { type: 'string', example: '/uploads/avatar/1234567890-avatar.jpg' },
          filename: { type: 'string', example: '1234567890-avatar.jpg' },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Client Auth'],
        summary: 'Đăng ký tài khoản khách hàng',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ClientRegister' },
            },
          },
        },
        responses: {
          201: {
            description: 'Đăng ký thành công',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            id: { type: 'integer', example: 1 },
                            email: { type: 'string', example: 'customer@example.com' },
                            fullName: { type: 'string', example: 'Nguyen Van A' },
                            phone: { type: 'string', example: '0912345678' },
                            avatar: { type: 'string', nullable: true },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: 'Email đã được sử dụng hoặc dữ liệu không hợp lệ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Client Auth'],
        summary: 'Đăng nhập khách hàng',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ClientLogin' },
            },
          },
        },
        responses: {
          200: {
            description: 'Đăng nhập thành công',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: { $ref: '#/components/schemas/LoginResponse' },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: 'Username hoặc mật khẩu không đúng',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Client Auth'],
        summary: 'Đăng xuất khách hàng',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Đăng xuất thành công',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
          401: {
            description: 'Chưa đăng nhập',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/profile': {
      get: {
        tags: ['Client Profile'],
        summary: 'Lấy thông tin profile khách hàng',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            id: { type: 'integer', example: 1 },
                            email: { type: 'string', example: 'customer@example.com' },
                            fullName: { type: 'string', example: 'Nguyen Van A' },
                            phone: { type: 'string', example: '0912345678' },
                            avatar: { type: 'string', nullable: true },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: 'Chưa đăng nhập',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
      put: {
        tags: ['Client Profile'],
        summary: 'Cập nhật thông tin profile khách hàng',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateProfile' },
            },
          },
        },
        responses: {
          200: {
            description: 'Cập nhật thành công',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            id: { type: 'integer', example: 1 },
                            email: { type: 'string', example: 'customer@example.com' },
                            fullName: { type: 'string', example: 'Nguyen Van B' },
                            phone: { type: 'string', example: '0987654321' },
                            avatar: { type: 'string', nullable: true },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: 'Chưa đăng nhập',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/profile/change-password': {
      post: {
        tags: ['Client Profile'],
        summary: 'Đổi mật khẩu khách hàng',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ChangePassword' },
            },
          },
        },
        responses: {
          200: {
            description: 'Đổi mật khẩu thành công',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
          400: {
            description: 'Mật khẩu cũ không đúng',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
          401: {
            description: 'Chưa đăng nhập',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/categories': {
      get: {
        tags: ['Client Categories'],
        summary: 'Lấy danh sách danh mục',
        security: [],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Category' },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    '/categories/{id}': {
      get: {
        tags: ['Client Categories'],
        summary: 'Lấy thông tin danh mục theo ID (kèm danh sách sản phẩm)',
        security: [],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: {
                          allOf: [
                            { $ref: '#/components/schemas/Category' },
                            {
                              properties: {
                                products: {
                                  type: 'array',
                                  items: { $ref: '#/components/schemas/Product' },
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    '/orders': {
      get: {
        tags: ['Client Orders'],
        summary: 'Lấy danh sách đơn hàng của tôi',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'status', in: 'query', schema: { type: 'string' }, description: 'Lọc theo trạng thái (PENDING, CONFIRMED, SHIPPING, DELIVERED, CANCELLED)' },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Order' },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: 'Chưa đăng nhập',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
      post: {
        tags: ['Client Orders'],
        summary: 'Tạo đơn hàng mới',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateOrder' },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: { $ref: '#/components/schemas/Order' },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: 'Chưa đăng nhập',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/orders/summary': {
      get: {
        tags: ['Client Orders'],
        summary: 'Lấy tổng hợp đơn hàng theo trạng thái',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: { $ref: '#/components/schemas/OrderSummary' },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: 'Chưa đăng nhập',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/orders/{id}': {
      get: {
        tags: ['Client Orders'],
        summary: 'Lấy thông tin đơn hàng của tôi theo ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: { $ref: '#/components/schemas/Order' },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: 'Chưa đăng nhập',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/orders/{id}/cancel': {
      put: {
        tags: ['Client Orders'],
        summary: 'Hủy đơn hàng',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: {
            description: 'Hủy đơn hàng thành công',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
          400: {
            description: 'Không thể hủy đơn hàng',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
          401: {
            description: 'Chưa đăng nhập',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/upload/avatar': {
      post: {
        tags: ['Client Upload'],
        summary: 'Upload avatar',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  avatar: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Upload thành công',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: { $ref: '#/components/schemas/UploadResponse' },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: 'Chưa đăng nhập',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
  },
};
