import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common'
import { DestinationService } from './destination.service'
import { CreateDestinationDto } from './dto/create-destination.dto'

@Controller('destinations')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  async createDestination(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationService.create(createDestinationDto)
  }

  @Get()
  async findAllDestinations() {
    return this.destinationService.findAll()
  }

  @Get(':id')
  async findDestinationById(@Param('id', ParseIntPipe) id: number) {
    const destination = await this.destinationService.findById(id)

    if (!destination) {
      throw new NotFoundException('여행지를 찾을 수 없어요.')
    }

    return destination
  }

  @Delete(':id')
  async removeDestination(@Param('id', ParseIntPipe) id: number) {
    await this.destinationService.remove(id)
    return { message: '여행지를 삭제했어요.' }
  }
}
