import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return this.userRepository.save(user)
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(userId, updateUserDto)
    return this.findById(userId)
  }

  async findById(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async findAll() {
    return this.userRepository.find()
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } })
  }

  async remove(userId: string) {
    const result = await this.userRepository.delete(userId)

    if (result.affected === 0) {
      throw new NotFoundException('User not found')
    }
  }
}
