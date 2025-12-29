import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDTO {
    @IsString({ message: 'Mã danh mục phải là chuỗi' })
    @IsNotEmpty({ message: 'Mã danh mục (danhmucid) không được để trống' })
    categoryCode: string;

    @IsString({ message: 'Tên danh mục phải là chuỗi' })
    @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
    name: string;
}

export class UpdateCategoryDTO {
    @IsString({ message: 'Mã danh mục phải là chuỗi' })
    categoryCode?: string;

    @IsString({ message: 'Tên danh mục phải là chuỗi' })
    name?: string;
}

