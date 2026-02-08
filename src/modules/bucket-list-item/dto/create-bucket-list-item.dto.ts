import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateBucketListItemDto {
  @IsNumber()
  @IsNotEmpty({ message: '여행지 ID는 필수 입력 항목입니다.' })
  destinationId: number
}
