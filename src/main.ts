import "reflect-metadata";
import express from "express";
import cors from "cors";
import 'dotenv/config';
import { AppDataSource } from "config/db";
import { logger } from "./utils/logger";
import routes from "./routes/index";
import hashUtil from "./utils/hash";
import { Admin } from "./entities/Admin.entity";
import { errorMiddleware } from "./middlewares/error.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";
import swaggerUi from 'swagger-ui-express';
import { swaggerAdminSpec } from './config/swagger.admin';
import { swaggerClientSpec } from './config/swagger.client';

const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true
}));

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);

app.use("/api", routes);

app.get('/api/docs/admin.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(swaggerAdminSpec);
});

app.get('/api/docs/client.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(swaggerClientSpec);
});

const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: '/api/docs/admin.json',
        name: 'Admin API',
      },
      {
        url: '/api/docs/client.json',
        name: 'Client API',
      },
    ],
  },
};

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));

app.use(notFoundMiddleware);

app.use(errorMiddleware);

AppDataSource.initialize()
  .then(async () => {
    logger.info('Database connected successfully');

    try {
      const adminRepo = AppDataSource.getRepository(Admin);
      const adminCount = await adminRepo.count();

      if (adminCount === 0) {
        logger.info('No admin found. Creating default admin account...');
        const hashedPassword = await hashUtil.hash('admin123');

        const admin = adminRepo.create({
          email: 'admin@gmail.com',
          password: hashedPassword,
          fullName: 'Administrator',
          phone: '0374698171',
          avatar: "admin.jpg",
          isDeleted: false,
          isDefault: true,
        });

        await adminRepo.save(admin);
        logger.info('Default admin created: admin@gmail.com / admin123');
      } else {
        logger.info(`Found ${adminCount} admin account(s) in database`);
        
        // Đảm bảo admin mặc định được đánh dấu isDefault = true
        const defaultAdmin = await adminRepo.findOne({
          where: { email: 'admin@gmail.com', isDeleted: false }
        });
        
        if (defaultAdmin && !defaultAdmin.isDefault) {
          defaultAdmin.isDefault = true;
          await adminRepo.save(defaultAdmin);
          logger.info('Updated existing admin account to default');
        }
      }
    } catch (error) {
      logger.error('Error creating admin:', error);
    }

    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
      logger.info(`Swagger docs: http://localhost:${PORT}/api/docs`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });
  })
  .catch((error) => {
    logger.error('Database connection failed:', error);
    process.exit(1);
  });