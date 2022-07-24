import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsString } from "class-validator";
import { Optional } from "@nestjs/common";

export class UpdatePermissionsDto {
  @ApiProperty()
  @Allow()
  @Optional()
  @IsString()
  name: string;

  @ApiProperty()
  @Allow()
  @Optional()
  @IsString()
  model: string;
}
