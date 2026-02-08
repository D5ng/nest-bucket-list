import { BadRequestException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BucketList } from '../bucket-list/bucket-list.entity'
import { BucketListService } from '../bucket-list/bucket-list.service'
import { Destination } from '../destination/destination.entity'
import { User } from '../user/user.entity'
import { BucketListItem } from './bucket-list-item.entity'
import { CreateBucketListItemDto } from './dto/create-bucket-list-item.dto'
import { UpdateBucketListItemDto } from './dto/update-bucket-list-item.dto'

export class BucketListItemService {
  constructor(
    @InjectRepository(BucketListItem)
    private readonly bucketListItemRepository: Repository<BucketListItem>,
    @InjectRepository(BucketList)
    private readonly bucketListRepository: Repository<BucketList>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    private readonly bucketListService: BucketListService,
  ) {}

  async create(userId: string, bucketListId: number, createBucketListItemDto: CreateBucketListItemDto) {
    const user = await this.userRepository.findOneBy({ id: userId })

    if (!user) {
      throw new UnauthorizedException('유저를 찾을 수 없어요')
    }

    const bucketList = await this.bucketListService.findById(bucketListId, userId)

    if (!bucketList) {
      throw new BadRequestException('버킷리스트를 찾을 수 없어요')
    }

    const destination = await this.destinationRepository.findOneBy({ id: createBucketListItemDto.destinationId })

    if (!destination) {
      throw new BadRequestException('여행지를 찾을 수 없어요')
    }

    const newBucketListItem = this.bucketListItemRepository.create({
      ...createBucketListItemDto,
      bucketList,
      destination,
    })

    await this.bucketListItemRepository.save(newBucketListItem)

    return { ...newBucketListItem, bucketList: undefined }
  }

  async findAll(userId: string, bucketListId: number) {
    return this.bucketListItemRepository.find({
      where: { bucketList: { id: bucketListId, user: { id: userId } } },
    })
  }

  async update(userId: string, bucketListId: number, bucketListItemId: number, updateBucketListItemDto: UpdateBucketListItemDto) {
    const bucketListItem = await this.bucketListItemRepository.findOne({
      where: { id: bucketListItemId, bucketList: { id: bucketListId, user: { id: userId } } },
    })

    if (!bucketListItem) {
      throw new BadRequestException('버킷리스트 아이템을 찾을 수 없어요')
    }

    bucketListItem.achieved = updateBucketListItemDto.achieved

    await this.bucketListItemRepository.save(bucketListItem)

    return { ...bucketListItem, bucketList: undefined }
  }

  async remove(userId: string, bucketListId: number, bucketListItemId: number) {
    const bucketListItem = await this.bucketListItemRepository.findOne({
      where: { id: bucketListItemId, bucketList: { id: bucketListId, user: { id: userId } } },
    })

    if (!bucketListItem) {
      throw new BadRequestException('버킷리스트 아이템을 찾을 수 없어요')
    }

    await this.bucketListItemRepository.remove(bucketListItem)
  }
}
