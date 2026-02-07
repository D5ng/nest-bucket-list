import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BucketListItem } from '../bucket-list-item/bucket-list-item.entity'
import { User } from '../user/user.entity'

@Entity()
export class BucketList {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string

  @ManyToOne(() => User, (user) => user.bucketList)
  user: User

  @OneToMany(
    () => BucketListItem,
    (bucketListItem) => bucketListItem.bucketList,
  )
  items: BucketListItem[]
}
