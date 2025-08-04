import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Collections } from './Collections';
import { Comments } from './Comments';
import { ImageLikes } from './ImageLikes';
import { Images } from './Images';
import { Tags } from './Tags';
import { UserFollows } from './UserFollows';

@Index('users_email_key', ['email'], { unique: true })
@Index('users_pkey', ['id'], { unique: true })
@Index('users_username_key', ['username'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('character varying', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('character varying', { name: 'username', unique: true, length: 50 })
  username: string;

  @Column('character varying', { name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column('character varying', {
    name: 'display_name',
    nullable: true,
    length: 100,
  })
  displayName: string | null;

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

  @OneToMany(() => Collections, (collections) => collections.user)
  collections: Collections[];

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @OneToMany(() => ImageLikes, (imageLikes) => imageLikes.user)
  imageLikes: ImageLikes[];

  @OneToMany(() => Images, (images) => images.user)
  images: Images[];

  @OneToMany(() => Tags, (tags) => tags.createdBy)
  tags: Tags[];

  @OneToMany(() => UserFollows, (userFollows) => userFollows.follower)
  userFollows: UserFollows[];

  @OneToMany(() => UserFollows, (userFollows) => userFollows.following)
  userFollows2: UserFollows[];
}
