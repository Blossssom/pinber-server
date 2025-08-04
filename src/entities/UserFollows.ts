import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './Users';

@Index('user_follows_pkey', ['followerId', 'followingId'], { unique: true })
@Index('idx_user_follows_following_id', ['followingId'], {})
@Entity('user_follows', { schema: 'public' })
export class UserFollows {
  @Column('uuid', { primary: true, name: 'follower_id' })
  followerId: string;

  @Column('uuid', { primary: true, name: 'following_id' })
  followingId: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.userFollows, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'follower_id', referencedColumnName: 'id' }])
  follower: Users;

  @ManyToOne(() => Users, (users) => users.userFollows2, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'following_id', referencedColumnName: 'id' }])
  following: Users;
}
