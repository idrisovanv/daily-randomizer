import { Optional } from 'sequelize';
import { Table, Model, HasMany, Column, AllowNull, Length } from 'sequelize-typescript';
import { ITeam } from '@interfaces/team.interface';
import DeveloperModel from './developers.model';

type TeamCreationAttributes = Optional<ITeam, 'id'>;

@Table({ tableName: 'teams' })
class TeamModel extends Model<ITeam, TeamCreationAttributes> {
  @AllowNull(false)
  @Length({ min: 3, max: 45 })
  @Column
  name: string;

  @HasMany(() => DeveloperModel)
  developers: DeveloperModel[];
}

export default TeamModel;
