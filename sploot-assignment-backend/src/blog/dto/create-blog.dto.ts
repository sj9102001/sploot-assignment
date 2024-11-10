import { IsString, IsUrl, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsUrl({})
  link: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}