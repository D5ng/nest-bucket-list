import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/user.entity'
import { BucketListController } from './bucket-list.controller'
import { BucketList } from './bucket-list.entity'
import { BucketListService } from './bucket-list.service'

@Module({
  imports: [TypeOrmModule.forFeature([BucketList, User])],
  providers: [BucketListService],
  controllers: [BucketListController],
  exports: [BucketListService],
})
export class BucketListModule {}
