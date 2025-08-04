import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Images } from './Images';
import { Users } from './Users';

@Index('comments_pkey', ['id'], { unique: true })
@Entity('comments', { schema: 'public' })
export class Comments {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('text', { name: 'content' })
  content: string;

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

  @ManyToOne(() => Images, (images) => images.comments, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;

  @ManyToOne(() => Comments, (comments) => comments.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'parent_comment_id', referencedColumnName: 'id' }])
  parentComment: Comments;

  @OneToMany(() => Comments, (comments) => comments.parentComment)
  comments: Comments[];

  @ManyToOne(() => Users, (users) => users.comments, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
