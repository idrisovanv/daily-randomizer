import { ITeam } from './teams.interface';

export interface IDeveloper {
  id?: number;
  name: string;
  email: string;
  role: DeveloperRole;
  status: DeveloperStatus;
  teamId: number;
  team?: ITeam;
}

export enum DeveloperRole {
  FRONTEND = 1,
  BACKEND = 2,
  FULLSTACK = 3,
}

export enum DeveloperStatus {
  FULLTIME = 1,
  CONTRACTOR = 2,
  TEMPORARILY_UNAVAILABLE = 3,
}

export interface IRandomDevelopersParams {
  teamId: number; 
  order: DeveloperOrder;
  speaker: SpeakerType;
}

export enum DeveloperOrder {
  RANDOM = 'random',
  ALPHABETICAL = 'alphabetical'
}

export enum SpeakerType {
  NONE = 'none',
  RANDOM = 'random',
  FIRST = 'first'
}