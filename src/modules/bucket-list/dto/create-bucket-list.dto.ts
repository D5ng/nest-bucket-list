import { IsNotEmpty, IsString } from 'class-validator'

export class CreateBucketListDto {
  @IsString()
  @IsNotEmpty({ message: '이름은 필수 입력 항목입니다.' })
  name: string
}
