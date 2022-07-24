import { ApiProperty } from "@nestjs/swagger";
import {
  Allow,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { Optional } from "@nestjs/common";

export class permissionDto {
  @ApiProperty()
  @Allow()
  @IsString()
  db: string;

  @ApiProperty()
  @Allow()
  @IsString()
  permission_id: string;

  @ApiProperty()
  @Allow()
  @IsString()
  permission_name: string;
}

export class UpdateRoleDto {
  @ApiProperty()
  @Allow()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @Allow()
  @Optional()
  @Type(() => permissionDto)
  @ValidateNested({ each: false })
  permissions: any;

  @ApiProperty()
  @Allow()
  @IsOptional()
  @IsIn(["REMOVE_PERMISSION", "ADD_PERMISSION"])
  type: string;
}
