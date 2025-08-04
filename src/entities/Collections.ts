import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CollectionImages } from './CollectionImages';
import { Images } from './Images';
import { Users } from './Users';

@Index('collections_pkey', ['id'], { unique: true })
@Entity('collections', { schema: 'public' })
export class Collections {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('character varying', { name: 'title', length: 200 })
  title: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('boolean', {
    name: 'is_public',
    nullable: true,
    default: () => 'true',
  })
  isPublic: boolean | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    nullable: true,
    default: () => 'now()',
  })
  updatedAt: Date | null;

  @OneToMany(
    () => CollectionImages,
    (collectionImages) => collectionImages.collection,
  )
  collectionImages: CollectionImages[];

  @ManyToOne(() => Images, (images) => images.collections, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'cover_image_id', referencedColumnName: 'id' }])
  coverImage: Images;

  @ManyToOne(() => Users, (users) => users.collections, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
