import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Images } from './Images';
import { Users } from './Users';

@Index('idx_image_likes_created_at', ['createdAt'], {})
@Index('image_likes_pkey', ['imageId', 'userId'], { unique: true })
@Index('idx_image_likes_image_id', ['imageId'], {})
@Entity('image_likes', { schema: 'public' })
export class ImageLikes {
  @Column('uuid', { primary: true, name: 'user_id' })
  userId: string;

  @Column('uuid', { primary: true, name: 'image_id' })
  imageId: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @ManyToOne(() => Images, (images) => images.imageLikes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;

  @ManyToOne(() => Users, (users) => users.imageLikes, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
