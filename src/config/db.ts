import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Admin } from "../entities/Admin.entity";
import { Customer } from "../entities/Customer.entity";
import { Product } from "entities/Product.entity";
import { Category } from "entities/Category.entity";
import { Order } from "entities/Order.entity";
import { OrderItem } from "entities/OrderItem.entity";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "test2",
    synchronize: true,
    logging: process.env.NODE_ENV === "development",
    entities: [Admin, Customer, Product, Category, Order, OrderItem],
});
