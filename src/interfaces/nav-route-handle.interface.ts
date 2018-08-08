import { ActionType, Placement } from '../models';

export interface UrlInfoAction {
  icon?: string;
  label?: string;
  type?: ActionType;
  className?: string;
  click?: Function;
  placement?: Placement;
  menu?: boolean | string;
  url?: string;
  image?: string;
  group?: string;
}
