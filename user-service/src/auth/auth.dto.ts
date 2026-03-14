import { IsAlphanumeric, IsBase64, IsEmail, IsJWT, IsMongoId, isMongoId, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { StringDecoder } from 'node:string_decoder';


export class RegisterDto {

    @IsString()
    @MaxLength(100)
    @MinLength(2)
    name!: string;

    @IsEmail()
    email!: string;

    
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password!: string;

    @IsString()
    @IsMongoId()
    role!: string;
}
export class LoginDto {

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password!: string;
}

export class RefreshDto {
    @IsString()
    @IsJWT()
    refresh_token!: string;
}