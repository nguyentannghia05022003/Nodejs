import {
    IsString,
    IsNotEmpty,
    IsNumber,
    Min,
    IsArray,
    ValidateNested,
    ArrayMinSize,
} from "class-validator";
import { Type } from "class-transformer";
import { Product } from "../../entities/Product.entity";

export class OrderItemDTO {
    @IsNumber({}, { message: 'ID sản phẩm phải là số' })
    @IsNotEmpty({ message: 'ID sản phẩm không được để trống' })
    productId: number;

    @IsNumber({}, { message: 'Số lượng phải là số' })
    @Min(1, { message: 'Số lượng phải lớn hơn 0' })
    quantity: number;

    static toOrderItems(
        items: OrderItemDTO[],
        products: Product[],
        orderId: number
    ) {
        return items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;
            return {
                orderId,
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: item.quantity,
            };
        });
    }

    static calculateTotalAmount(
        items: OrderItemDTO[],
        products: Product[]
    ): number {
        return items.reduce((total, item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) {
                throw new Error(`Không tìm thấy sản phẩm với ID: ${item.productId}`);
            }
            return total + (Number(product.price) * item.quantity);
        }, 0);
    }
}

export class CreateOrderDTO {
    @IsArray({ message: 'Danh sách sản phẩm phải là mảng' })
    @ArrayMinSize(1, { message: 'Đơn hàng phải có ít nhất 1 sản phẩm' })
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    items: OrderItemDTO[];
}

export class AdminCreateOrderDTO {
    @IsNumber({}, { message: 'ID khách hàng phải là số' })
    @IsNotEmpty({ message: 'ID khách hàng không được để trống' })
    customerId: number;

    @IsArray({ message: 'Danh sách sản phẩm phải là mảng' })
    @ArrayMinSize(1, { message: 'Đơn hàng phải có ít nhất 1 sản phẩm' })
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    items: OrderItemDTO[];
}

