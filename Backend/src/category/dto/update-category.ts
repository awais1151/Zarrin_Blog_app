import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export  class UpdateCategoryDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly title:string;

    
}