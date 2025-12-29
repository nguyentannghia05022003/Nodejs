export const swaggerAdminSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Admin API',
    version: '1.0.0',
    description: 'API documentation cho Admin',
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
      LoginResponse: {
        type: 'object',
        properties: {
          accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          tokenExpires: { type: 'integer', example: 1234567890 },
          admin: { $ref: '#/components/schemas/Admin' },
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
      Customer: {
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
      CreateCustomer: {
        type: 'object',
        required: ['email', 'password', 'fullName'],
        properties: {
          email: { type: 'string', format: 'email', example: 'customer@example.com' },
          password: { type: 'string', minLength: 6, example: 'password123' },
          fullName: { type: 'string', example: 'Nguyen Van A' },
          phone: { type: 'string', example: '0912345678' },
        },
      },
      UpdateCustomer: {
        type: 'object',
        properties: {
          fullName: { type: 'string' },
          phone: { type: 'string' },
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
      CreateProduct: {
        type: 'object',
        required: ['name', 'image', 'description', 'price', 'categoryCode'],
        properties: {
          name: { type: 'string', example: 'iPhone 15' },
          image: { type: 'string', example: 'iphone15.jpg' },
          description: { type: 'string', example: 'Mô tả sản phẩm' },
          price: { type: 'number', example: 20000000 },
          categoryCode: { type: 'string', example: 'CAT-001' },
        },
      },
      UpdateProduct: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          image: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' },
          categoryCode: { type: 'string' },
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
      CreateCategory: {
        type: 'object',
        required: ['categoryCode', 'name'],
        properties: {
          categoryCode: { type: 'string', example: 'CAT-001' },
          name: { type: 'string', example: 'Điện thoại' },
        },
      },
      UpdateCategory: {
        type: 'object',
        properties: {
          categoryCode: { type: 'string' },
          name: { type: 'string' },
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
        required: ['customerId', 'orderCode', 'totalAmount', 'items'],
        properties: {
          customerId: { type: 'integer', example: 1 },
          orderCode: { type: 'string', example: 'ORD-001' },
          totalAmount: { type: 'number', example: 50000000 },
          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/OrderItem' },
          },
        },
      },
      UpdateOrderStatus: {
        type: 'object',
        required: ['status'],
        properties: {
          status: { type: 'string', enum: ['PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED', 'CANCELLED'], example: 'CONFIRMED' },
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
    '/admin/users': {
      get: {
        tags: ['Admin Users'],
        summary: 'List admins',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'fullName', in: 'query', schema: { type: 'string' } },
          { name: 'email', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
      post: {
        tags: ['Admin Users'],
        summary: 'Create admin',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/CreateAdmin' } },
          },
        },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
        },
      },
    },
    '/admin/users/{id}': {
      get: {
        tags: ['Admin Users'],
        summary: 'Get admin by id',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } } },
      },
      put: {
        tags: ['Admin Users'],
        summary: 'Update admin',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateAdmin' } } },
        },
        responses: { 200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } } },
      },
      delete: {
        tags: ['Admin Users'],
        summary: 'Soft delete admin',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } } },
      },
    },
    '/admin/users/{id}/reset-password': {
      post: {
        tags: ['Admin Users'],
        summary: 'Reset password',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ResetPassword' } } } },
        responses: { 200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } } },
      },
    },
    '/admin/auth/login': {
      post: {
        tags: ['Admin Auth'],
        summary: 'Đăng nhập admin',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AdminLogin' },
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
    '/admin/auth/logout': {
      post: {
        tags: ['Admin Auth'],
        summary: 'Đăng xuất admin',
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
    '/admin/profile': {
      get: {
        tags: ['Admin Profile'],
        summary: 'Lấy thông tin profile admin',
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
                        data: { $ref: '#/components/schemas/Admin' },
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
        tags: ['Admin Profile'],
        summary: 'Cập nhật thông tin profile admin',
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
                        data: { $ref: '#/components/schemas/Admin' },
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
    '/admin/profile/change-password': {
      post: {
        tags: ['Admin Profile'],
        summary: 'Đổi mật khẩu admin',
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
    '/admin/dashboard/customers/top-by-orders': {
      get: {
        tags: ['Admin Dashboard'],
        summary: 'Lấy top khách hàng theo số đơn hàng',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 10, minimum: 1, maximum: 100 },
            description: 'Số lượng khách hàng muốn lấy (mặc định: 10)',
          },
        ],
        responses: {
          200: {
            description: 'Lấy top khách hàng theo số đơn thành công',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              customerId: { type: 'integer', example: 1 },
                              fullName: { type: 'string', example: 'Nguyen Van A' },
                              email: { type: 'string', example: 'customer@example.com' },
                              phone: { type: 'string', example: '0912345678' },
                              orderCount: { type: 'integer', example: 15 },
                              totalRevenue: { type: 'number', example: 50000000 },
                            },
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
    '/admin/dashboard/customers/top-by-revenue': {
      get: {
        tags: ['Admin Dashboard'],
        summary: 'Lấy top khách hàng theo doanh số',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 10, minimum: 1, maximum: 100 },
            description: 'Số lượng khách hàng muốn lấy (mặc định: 10)',
          },
        ],
        responses: {
          200: {
            description: 'Lấy top khách hàng theo doanh số thành công',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              customerId: { type: 'integer', example: 1 },
                              fullName: { type: 'string', example: 'Nguyen Van A' },
                              email: { type: 'string', example: 'customer@example.com' },
                              phone: { type: 'string', example: '0912345678' },
                              orderCount: { type: 'integer', example: 12 },
                              totalRevenue: { type: 'number', example: 75000000 },
                            },
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
    '/admin/dashboard/customers/purchase-cycles': {
      get: {
        tags: ['Admin Dashboard'],
        summary: 'Lấy chu kỳ mua hàng của khách hàng',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'customerId',
            in: 'query',
            schema: { type: 'integer' },
            description: 'ID khách hàng (nếu không có thì lấy tất cả)',
          },
        ],
        responses: {
          200: {
            description: 'Lấy chu kỳ mua hàng thành công',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              customerId: { type: 'integer', example: 1 },
                              fullName: { type: 'string', example: 'Nguyen Van A' },
                              email: { type: 'string', example: 'customer@example.com' },
                              orderCount: { type: 'integer', example: 5 },
                              firstOrderDate: { type: 'integer', example: 1234567890 },
                              lastOrderDate: { type: 'integer', example: 1234567890 },
                              averageCycleDays: { type: 'integer', example: 30 },
                              totalDays: { type: 'integer', example: 120 },
                            },
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
    '/admin/dashboard/customers': {
      get: {
        tags: ['Admin Dashboard'],
        summary: 'Lấy dashboard khách hàng',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 10 },
            description: 'Số lượng khách hàng muốn lấy',
          },
        ],
        responses: {
          200: {
            description: 'Lấy dashboard khách hàng thành công',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/admin/dashboard/categories/by-product-count': {
      get: {
        tags: ['Admin Dashboard'],
        summary: 'Lấy dashboard danh mục theo số lượng sản phẩm',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lấy dashboard danh mục theo số lượng sản phẩm thành công',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              categoryCode: { type: 'string', example: 'CAT-001' },
                              categoryName: { type: 'string', example: 'Điện thoại' },
                              productCount: { type: 'integer', example: 15 },
                            },
                          },
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
    '/admin/dashboard/categories/by-revenue': {
      get: {
        tags: ['Admin Dashboard'],
        summary: 'Lấy dashboard danh mục theo doanh số',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lấy dashboard danh mục theo doanh số thành công',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      properties: {
                        data: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              categoryCode: { type: 'string', example: 'CAT-001' },
                              categoryName: { type: 'string', example: 'Điện thoại' },
                              revenue: { type: 'number', example: 50000000 },
                            },
                          },
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
    '/admin/customers': {
      get: {
        tags: ['Admin Customers'],
        summary: 'Lấy danh sách khách hàng',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'fullName', in: 'query', schema: { type: 'string' } },
          { name: 'email', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
      post: {
        tags: ['Admin Customers'],
        summary: 'Tạo khách hàng mới',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateCustomer' },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/admin/customers/{id}': {
      get: {
        tags: ['Admin Customers'],
        summary: 'Lấy thông tin khách hàng theo ID',
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
                        data: { $ref: '#/components/schemas/Customer' },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Admin Customers'],
        summary: 'Cập nhật thông tin khách hàng',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateCustomer' },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Admin Customers'],
        summary: 'Xóa khách hàng',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/admin/products': {
      get: {
        tags: ['Admin Products'],
        summary: 'Lấy danh sách sản phẩm',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'name', in: 'query', schema: { type: 'string' } },
          { name: 'categoryCode', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
      post: {
        tags: ['Admin Products'],
        summary: 'Tạo sản phẩm mới',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateProduct' },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/admin/products/{id}': {
      get: {
        tags: ['Admin Products'],
        summary: 'Lấy thông tin sản phẩm theo ID',
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
                        data: { $ref: '#/components/schemas/Product' },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Admin Products'],
        summary: 'Cập nhật sản phẩm',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateProduct' },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Admin Products'],
        summary: 'Xóa sản phẩm',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/admin/categories': {
      get: {
        tags: ['Admin Categories'],
        summary: 'Lấy danh sách danh mục',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
      post: {
        tags: ['Admin Categories'],
        summary: 'Tạo danh mục mới',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateCategory' },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/admin/categories/{id}': {
      get: {
        tags: ['Admin Categories'],
        summary: 'Lấy thông tin danh mục theo ID (kèm danh sách sản phẩm)',
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
      put: {
        tags: ['Admin Categories'],
        summary: 'Cập nhật danh mục',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateCategory' },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Admin Categories'],
        summary: 'Xóa danh mục',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/admin/orders': {
      get: {
        tags: ['Admin Orders'],
        summary: 'Lấy danh sách đơn hàng',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'status', in: 'query', schema: { type: 'string' } },
          { name: 'customerId', in: 'query', schema: { type: 'integer' } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
      post: {
        tags: ['Admin Orders'],
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
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/admin/orders/{id}': {
      get: {
        tags: ['Admin Orders'],
        summary: 'Lấy thông tin đơn hàng theo ID',
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
        },
      },
      delete: {
        tags: ['Admin Orders'],
        summary: 'Xóa đơn hàng',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/admin/orders/{id}/status': {
      put: {
        tags: ['Admin Orders'],
        summary: 'Cập nhật trạng thái đơn hàng',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateOrderStatus' },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },
    '/admin/upload/avatar': {
      post: {
        tags: ['Admin Upload'],
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
        },
      },
    },
    '/admin/upload/product': {
      post: {
        tags: ['Admin Upload'],
        summary: 'Upload ảnh sản phẩm',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  product: {
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
        },
      },
    },
  },
};
