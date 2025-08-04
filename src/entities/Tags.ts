import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ImageTags } from './ImageTags';
import { Users } from './Users';

@Index('tags_pkey', ['id'], { unique: true })
@Index('idx_tags_name', ['name'], {})
@Index('tags_name_key', ['name'], { unique: true })
@Index('idx_tags_usage_count', ['usageCount'], {})
@Entity('tags', { schema: 'public' })
export class Tags {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('character varying', { name: 'name', unique: true, length: 100 })
  name: string;

  @Column('integer', {
    name: 'usage_count',
    nullable: true,
    default: () => '1',
  })
  usageCount: number | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @OneToMany(() => ImageTags, (imageTags) => imageTags.tag)
  imageTags: ImageTags[];

  @ManyToOne(() => Users, (users) => users.tags, { onDelete: 'SET NULL' })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: Users;
}
