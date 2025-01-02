import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, IsPositive, Min } from "class-validator"

export class PaginationDto {

    @ApiProperty({
        default: 10, description: 'How many rows do you need'
    })
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number;
    

    @ApiProperty({
        default: 0, description: 'How many rows do you want to skip'
    })
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    @Min(0)
    offset?: number;
}