import { Optional } from 'sequelize';
import { Table, Model, Column, ForeignKey, BelongsTo, AllowNull, Unique, Default, IsEmail, Length, Scopes } from 'sequelize-typescript';
import { IDeveloper, DeveloperRole, DeveloperStatus } from '@interfaces/developers.interface';
import TeamModel from './teams.model';
import sequelize from 'sequelize';

type DeveloperCreationAttributes = Optional<IDeveloper, 'id'>;

@Scopes(() => ({
  available: {
    where: {
      status: { [sequelize.Op.not]: DeveloperStatus.TEMPORARILY_UNAVAILABLE },
    },
  },
  random: {
    order: sequelize.literal('random()'),
  },
  alphabetical: {
    order: [['name', 'ASC']],
  },
  byTeam: (teamId: number) => ({
    where: { teamId },
  }),
}))
@Table({ tableName: 'developers' })
class DeveloperModel extends Model<IDeveloper, DeveloperCreationAttributes> {
  @AllowNull(false)
  @Length({ min: 3, max: 45 })
  @Column
  name: string;

  @AllowNull(false)
  @Unique
  @Length({ min: 3, max: 45 })
  @IsEmail
  @Column
  email: string;

  @AllowNull(false)
  @Default(DeveloperRole.FULLSTACK)
  @Column
  role: DeveloperRole;

  @AllowNull(false)
  @Default(DeveloperStatus.FULLTIME)
  @Column
  status: DeveloperStatus;

  @ForeignKey(() => TeamModel)
  @Column
  teamId: number;

  @BelongsTo(() => TeamModel)
  team: TeamModel;
}

export default DeveloperModel;
