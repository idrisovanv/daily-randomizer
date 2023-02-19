import { JsonController, Param, Body, Get, Post, Delete } from 'routing-controllers';
import { ITeam } from '@interfaces/team.interface';
import TeamModel from '@models/teams.model';

@JsonController()
export class TeamsController {
  @Get('/teams')
  getAll() {
    return TeamModel.findAll({ raw: true });
  }

  @Post('/teams')
  post(@Body() developer: ITeam) {
    return TeamModel.create(developer);
  }

  @Delete('/teams/:id')
  remove(@Param('id') id: number) {
    return TeamModel.destroy({ where: { id } });
  }
}
