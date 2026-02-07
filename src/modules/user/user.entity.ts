import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BucketList } from '../bucket-list/bucket-list.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
  })
  name: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
  })
  username: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
  })
  password: string

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  refreshToken?: string

  @OneToMany(() => BucketList, (bucketList) => bucketList.user)
  bucketList: BucketList[]
}
