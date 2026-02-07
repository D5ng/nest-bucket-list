import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DestinationController } from './destination.controller'
import { Destination } from './destination.entity'
import { DestinationService } from './destination.service'

@Module({
  imports: [TypeOrmModule.forFeature([Destination])],
  providers: [DestinationService],
  controllers: [DestinationController],
})
export class DestinationsModule {}
