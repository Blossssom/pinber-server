import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Collections } from './Collections';
import { Images } from './Images';

@Index('collection_images_pkey', ['collectionId', 'imageId'], { unique: true })
@Entity('collection_images', { schema: 'public' })
export class CollectionImages {
  @Column('uuid', { primary: true, name: 'collection_id' })
  collectionId: string;

  @Column('uuid', { primary: true, name: 'image_id' })
  imageId: string;

  @Column('timestamp without time zone', {
    name: 'added_at',
    nullable: true,
    default: () => 'now()',
  })
  addedAt: Date | null;

  @Column('integer', { name: 'sort_order', nullable: true, default: () => '0' })
  sortOrder: number | null;

  @ManyToOne(() => Collections, (collections) => collections.collectionImages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'collection_id', referencedColumnName: 'id' }])
  collection: Collections;

  @ManyToOne(() => Images, (images) => images.collectionImages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;
}
