import {
    IsString,
    IsNotEmpty,
    IsNumber,
    Min,
    IsInt,
} from "class-validator";

export class CreateProductDTO {
    @IsString({ message: 'Tên sản phẩm phải là chuỗi' })
    @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
    name: string;

    @IsString({ message: 'Hình ảnh phải là chuỗi (URL hoặc đường dẫn)' })
    @IsNotEmpty({ message: 'Hình ảnh sản phẩm không được để trống' })
    image: string;

    @IsString({ message: 'Mô tả phải là chuỗi' })
    @IsNotEmpty({ message: 'Mô tả sản phẩm không được để trống' })
    description: string;

    @IsNumber({}, { message: 'Giá sản phẩm phải là số' })
    @Min(0, { message: 'Giá sản phẩm phải lớn hơn hoặc bằng 0' })
    price: number;

    @IsInt({ message: 'ID danh mục phải là số nguyên' })
    @IsNotEmpty({ message: 'ID danh mục không được để trống' })
    categoryId: number;
}
