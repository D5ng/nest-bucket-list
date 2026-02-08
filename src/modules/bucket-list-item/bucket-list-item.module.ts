import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BucketList } from '../bucket-list/bucket-list.entity'
import { BucketListModule } from '../bucket-list/bucket-list.module'
import { Destination } from '../destination/destination.entity'
import { User } from '../user/user.entity'
import { BucketListItemController } from './bucket-list-item.controller'
import { BucketListItem } from './bucket-list-item.entity'
import { BucketListItemService } from './bucket-list-item.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, BucketList, BucketListItem, Destination]), BucketListModule],
  providers: [BucketListItemService],
  controllers: [BucketListItemController],
})
export class BucketListItemModule {}
