import "reflect-metadata";
import express from "express";
import 'dotenv/config';
import dotenv from 'dotenv';
import { AppDataSource } from "config/db";
import { logger } from "./utils/logger";
import routes from "./routes/index";

// Load environment variables
dotenv.config();

const app = express()
const PORT = process.env.PORT || 8080;

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config static files: images/css/js
app.use(express.static('public'));

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config routes
app.use("/api", routes);

//config db
AppDataSource.initialize()
    .then(() => {
        logger.info('Database connected successfully');

        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
            logger.info(`Environment: ${process.env.NODE_ENV}`);
        });
    })
    .catch((error) => {
        logger.error('Database connection failed:', error);
        process.exit(1);
    });
