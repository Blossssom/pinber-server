import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Images } from './Images';

@Index('image_stats_pkey', ['imageId'], { unique: true })
@Entity('image_stats', { schema: 'public' })
export class ImageStats {
  @Column('uuid', { primary: true, name: 'image_id' })
  imageId: string;

  @Column('bigint', { name: 'view_count', nullable: true, default: () => '0' })
  viewCount: string | null;

  @Column('integer', { name: 'like_count', nullable: true, default: () => '0' })
  likeCount: number | null;

  @Column('bigint', {
    name: 'download_count',
    nullable: true,
    default: () => '0',
  })
  downloadCount: string | null;

  @Column('timestamp without time zone', {
    name: 'last_viewed_at',
    nullable: true,
  })
  lastViewedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    nullable: true,
    default: () => 'now()',
  })
  updatedAt: Date | null;

  @OneToOne(() => Images, (images) => images.imageStats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;
}
