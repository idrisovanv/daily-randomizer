import { JsonController, Param, Body, Get, Post, Delete, QueryParam, Patch } from 'routing-controllers';
import { DeveloperOrder, IDeveloper, SpeakerType } from '@interfaces/developers.interface';
import DeveloperModel from '@models/developers.model';

@JsonController()
export class DevelopersController {
  @Get('/developers')
  getAll(@QueryParam('page') page: number, @QueryParam('perPage') perPage: number) {
    return DeveloperModel.findAndCountAll({
      raw: true,
      offset: page * perPage,
      limit: perPage,
      order: [['name', 'asc']],
    });
  }

  @Get('/developers/random')
  async getRandom(@QueryParam('teamId') teamId: number, @QueryParam('order') order: DeveloperOrder, @QueryParam('speaker') speaker: SpeakerType) {
    const scopes: any[] = ['available', order];
    if (!!teamId) {
      scopes.push({ method: ['byTeam', teamId] });
    }

    const developers = await DeveloperModel.scope(scopes).findAll({ raw: true });

    if (developers.length === 0) {
      return { developers };
    }

    let speakerId;

    switch (speaker) {
      case SpeakerType.RANDOM:
        speakerId = developers[Math.floor(Math.random() * developers.length)].id;
        break;
      case SpeakerType.FIRST:
        speakerId = developers[0].id;
        break;
      default:
        break;
    }
    return { developers, speakerId };
  }

  @Post('/developers')
  post(@Body() developer: IDeveloper) {
    return DeveloperModel.create(developer);
  }

  @Patch('/developers/:id')
  put(@Param('id') id: number, @Body() developer: IDeveloper) {
    return DeveloperModel.update(developer, { where: { id } });
  }

  @Delete('/developers/:id')
  remove(@Param('id') id: number) {
    return DeveloperModel.destroy({ where: { id } });
  }
}
