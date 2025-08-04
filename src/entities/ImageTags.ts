import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Images } from './Images';
import { Tags } from './Tags';

@Index('idx_images_tags_created_at', ['createdAt'], {})
@Index('image_tags_pkey', ['imageId', 'tagId'], { unique: true })
@Index('idx_images_tags_tag_id', ['tagId'], {})
@Entity('image_tags', { schema: 'public' })
export class ImageTags {
  @Column('uuid', { primary: true, name: 'image_id' })
  imageId: string;

  @Column('uuid', { primary: true, name: 'tag_id' })
  tagId: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @ManyToOne(() => Images, (images) => images.imageTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;

  @ManyToOne(() => Tags, (tags) => tags.imageTags, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tag: Tags;
}
