import { AccessTokenGuard } from '@/shared/guards/access-token.guard'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common'
import { BucketListService } from './bucket-list.service'
import { CreateBucketListDto } from './dto/create-bucket-list.dto'

@Controller('bucket-lists')
export class BucketListController {
  constructor(private readonly bucketListService: BucketListService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async createBucketList(@Body() createBucketListDto: CreateBucketListDto, @Req() req: RequestWithUser) {
    const userId = req.user['sub']
    return this.bucketListService.create(userId, createBucketListDto)
  }

  @Get('')
  @UseGuards(AccessTokenGuard)
  async getBucketLists(@Req() req: RequestWithUser) {
    const userId = req.user['sub']
    return this.bucketListService.findAll(userId)
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  async getBucketListById(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    const userId = req.user['sub']
    return this.bucketListService.findById(id, userId)
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  async deleteBucketList(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    const userId = req.user['sub']
    return this.bucketListService.remove(id, userId)
  }
}
