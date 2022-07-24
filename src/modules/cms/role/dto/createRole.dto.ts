import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty()
  @Allow()
  @IsOptional()
  @IsString()
  name: string;
}
