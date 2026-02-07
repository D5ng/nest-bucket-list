import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BucketListItem } from '../bucket-list-item/bucket-list-item.entity'

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  location: string

  @OneToMany(() => BucketListItem, (bucketListItem) => bucketListItem.destination)
  bucketListItems: BucketListItem[]
}
