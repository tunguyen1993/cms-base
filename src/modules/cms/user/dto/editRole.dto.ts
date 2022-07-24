import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsOptional, IsString } from "class-validator";

export class EditRoleDto {
  @ApiProperty()
  @Allow()
  @IsOptional()
  @IsString()
  role_id: string;
}
