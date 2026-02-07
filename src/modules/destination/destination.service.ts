import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Destination } from './destination.entity'
import { CreateDestinationDto } from './dto/create-destination.dto'

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
  ) {}

  async create(createDestinationDto: CreateDestinationDto) {
    const existingDestination = await this.destinationRepository.findBy({ name: createDestinationDto.name })

    if (existingDestination.length > 0) {
      throw new BadRequestException('이미 존재하는 여행지입니다.')
    }

    const destination = this.destinationRepository.create(createDestinationDto)
    const createdDestination = await this.destinationRepository.save(destination)
    return createdDestination
  }

  async findAll() {
    return this.destinationRepository.find()
  }

  async findById(id: number) {
    return this.destinationRepository.findOneBy({ id })
  }

  async remove(id: number) {
    const existingDestination = await this.destinationRepository.findOneBy({ id })

    if (!existingDestination) {
      throw new NotFoundException('여행지를 찾을 수 없어요.')
    }

    await this.destinationRepository.delete(id)
  }
}
