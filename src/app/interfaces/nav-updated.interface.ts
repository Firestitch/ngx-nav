import { FsNavUpdateType } from '../services/fs-nav-updates.service';

export interface NavUpdated {
  name: string;
  type: FsNavUpdateType;
  value: any;
}
