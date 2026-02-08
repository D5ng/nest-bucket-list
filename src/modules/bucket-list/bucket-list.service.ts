import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user/user.entity'
import { BucketList } from './bucket-list.entity'
import { CreateBucketListDto } from './dto/create-bucket-list.dto'

@Injectable()
export class BucketListService {
  constructor(
    @InjectRepository(BucketList)
    private readonly bucketListRepository: Repository<BucketList>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: string, createBucketListDto: CreateBucketListDto) {
    const user = await this.userRepository.findOneBy({ id: userId })

    if (!user) {
      throw new UnauthorizedException('유저를 찾을 수 없어요')
    }

    const existingBucketList = await this.bucketListRepository.findBy({ name: createBucketListDto.name, user: { id: userId } })

    if (existingBucketList.length > 0) {
      throw new BadRequestException('이미 존재하는 이름의 버킷리스트입니다.')
    }

    const newBucketList = this.bucketListRepository.create({
      ...createBucketListDto,
      user,
    })

    await this.bucketListRepository.save(newBucketList)

    return {
      ...newBucketList,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    }
  }

  async findById(id: number, userId: string) {
    return this.bucketListRepository.findOne({
      where: { id, user: { id: userId } },
    })
  }

  async findAll(userId: string) {
    return this.bucketListRepository.find({
      where: { user: { id: userId } },
    })
  }

  async remove(id: number, userId: string) {
    const bucketList = await this.findById(id, userId)

    if (!bucketList) {
      throw new BadRequestException('버킷리스트를 찾을 수 없어요')
    }

    await this.bucketListRepository.remove(bucketList)
  }
}
