import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateDestinationDto {
  @IsString()
  @IsNotEmpty({ message: '이름은 필수 입력 항목입니다.' })
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsNotEmpty({ message: '위치는 필수 입력 항목입니다.' })
  location: string
}
