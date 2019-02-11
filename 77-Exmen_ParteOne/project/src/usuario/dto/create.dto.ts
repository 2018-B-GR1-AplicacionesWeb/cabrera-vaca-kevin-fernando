import {
    Contains,
    IsAlphanumeric,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxDate,
    MinLength,
    Validator
} from "class-validator";

//const hoy =(new Date());

export class CreateUsuarioDto  {
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    nombre:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    correo:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    password: string;

    @IsNotEmpty()
    fecha: Date;
}