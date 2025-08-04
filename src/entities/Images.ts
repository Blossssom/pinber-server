import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CollectionImages } from './CollectionImages';
import { Collections } from './Collections';
import { Comments } from './Comments';
import { ImageLikes } from './ImageLikes';
import { ImageStats } from './ImageStats';
import { ImageTags } from './ImageTags';
import { Users } from './Users';

@Index('images_pkey', ['id'], { unique: true })
@Entity('images', { schema: 'public' })
export class Images {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('character varying', { name: 'original_filename', length: 255 })
  originalFilename: string;

  @Column('bigint', { name: 'original_size' })
  originalSize: string;

  @Column('character varying', { name: 'mime_type', length: 100 })
  mimeType: string;

  @Column('integer', { name: 'width' })
  width: number;

  @Column('integer', { name: 'height' })
  height: number;

  @Column('character varying', { name: 'file_hash', length: 64 })
  fileHash: string;

  @Column('character varying', { name: 'folder_path', length: 255 })
  folderPath: string;

  @Column('character varying', { name: 'base_name', length: 255 })
  baseName: string;

  @Column('enum', {
    name: 'status',
    nullable: true,
    enum: ['uploading', 'processing', 'completed', 'failed'],
    default: () => "'uploading'",
  })
  status: 'uploading' | 'processing' | 'completed' | 'failed' | null;

  @Column('text', { name: 'alt_text', nullable: true })
  altText: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('character varying', { name: 'category', nullable: true, length: 50 })
  category: string | null;

  @Column('character varying', {
    name: 'sub_category',
    nullable: true,
    length: 50,
  })
  subCategory: string | null;

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
    (collectionImages) => collectionImages.image,
  )
  collectionImages: CollectionImages[];

  @OneToMany(() => Collections, (collections) => collections.coverImage)
  collections: Collections[];

  @OneToMany(() => Comments, (comments) => comments.image)
  comments: Comments[];

  @OneToMany(() => ImageLikes, (imageLikes) => imageLikes.image)
  imageLikes: ImageLikes[];

  @OneToOne(() => ImageStats, (imageStats) => imageStats.image)
  imageStats: ImageStats;

  @OneToMany(() => ImageTags, (imageTags) => imageTags.image)
  imageTags: ImageTags[];

  @ManyToOne(() => Users, (users) => users.images, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
