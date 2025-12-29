import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEmail,
    MinLength,
    IsMobilePhone,
} from 'class-validator';

export class AdminLoginDTO {
    @IsString({ message: 'Username phải là chuỗi' })
    @IsNotEmpty({ message: 'Username không được để trống' })
    username!: string;

    @IsString({ message: 'Mật khẩu phải là chuỗi' })
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    password!: string;
}


export class ClientRegisterDTO {
    @IsEmail({}, { message: 'Email không hợp lệ' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    email!: string;

    @IsString({ message: 'Mật khẩu phải là chuỗi' })
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @MinLength(6, { message: 'Mật khẩu phải ít nhất 6 ký tự' })
    password!: string;

    @IsString({ message: 'Họ tên phải là chuỗi' })
    @IsNotEmpty({ message: 'Họ tên không được để trống' })
    fullName!: string;

    @IsOptional()
    @IsString({ message: 'Số điện thoại phải là chuỗi' })
    @IsMobilePhone('vi-VN', {}, { message: 'Số điện thoại không hợp lệ' })
    phone?: string;
}

export class ClientLoginDTO {
    @IsString({ message: 'Username phải là chuỗi' })
    @IsNotEmpty({ message: 'Username không được để trống' })
    username!: string;

    @IsString({ message: 'Mật khẩu phải là chuỗi' })
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    password!: string;
}
