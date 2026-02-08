import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BucketList } from '../bucket-list/bucket-list.entity'
import { Destination } from '../destination/destination.entity'

@Entity()
export class BucketListItem {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => BucketList, (bucketList) => bucketList.items)
  bucketList: BucketList

  @ManyToOne(() => Destination, (destination) => destination.bucketListItems, { eager: true })
  destination: Destination

  @Column({ type: 'boolean', default: false })
  achieved: boolean
}
