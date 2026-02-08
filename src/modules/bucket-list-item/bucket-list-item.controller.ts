import { AccessTokenGuard } from '@/shared/guards/access-token.guard'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { BucketListItemService } from './bucket-list-item.service'
import { CreateBucketListItemDto } from './dto/create-bucket-list-item.dto'
import { UpdateBucketListItemDto } from './dto/update-bucket-list-item.dto'

@Controller('bucket-list-items')
export class BucketListItemController {
  constructor(private readonly bucketListItemService: BucketListItemService) {}

  @Post(':bucketListId/items')
  @UseGuards(AccessTokenGuard)
  async CreateBucketListItemDto(
    @Req() req: RequestWithUser,
    @Param('bucketListId', ParseIntPipe) bucketListId: number,
    @Body() createBucketListItemDto: CreateBucketListItemDto,
  ) {
    const userId = req.user['sub']
    return this.bucketListItemService.create(userId, bucketListId, createBucketListItemDto)
  }

  @Get(':bucketListId/items')
  @UseGuards(AccessTokenGuard)
  async findAllBucketListItems(@Req() req: RequestWithUser, @Param('bucketListId', ParseIntPipe) bucketListId: number) {
    const userId = req.user['sub']
    return this.bucketListItemService.findAll(userId, bucketListId)
  }

  @Patch(':bucketListId/items/:bucketListItemId')
  @UseGuards(AccessTokenGuard)
  async updateBucketListItem(
    @Req() req: RequestWithUser,
    @Param('bucketListItemId', ParseIntPipe) bucketListItemId: number,
    @Param('bucketListId', ParseIntPipe) bucketListId: number,
    @Body() updateBucketListItemDto: UpdateBucketListItemDto,
  ) {
    const userId = req.user['sub']
    return this.bucketListItemService.update(userId, bucketListId, bucketListItemId, updateBucketListItemDto)
  }

  @Delete(':bucketListId/items/:bucketListItemId')
  @UseGuards(AccessTokenGuard)
  async deleteBucketListItem(
    @Req() req: RequestWithUser,
    @Param('bucketListItemId', ParseIntPipe) bucketListItemId: number,
    @Param('bucketListId', ParseIntPipe) bucketListId: number,
  ) {
    const userId = req.user['sub']
    return this.bucketListItemService.remove(userId, bucketListId, bucketListItemId)
  }
}
