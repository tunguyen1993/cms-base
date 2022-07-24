import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsString } from "class-validator";

export class CreatePermissionsDto {
  @ApiProperty()
  @Allow()
  @IsString()
  name: string;

  @ApiProperty()
  @Allow()
  @IsString()
  model: string;
}
