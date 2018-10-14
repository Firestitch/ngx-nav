import { ActionType, ActionPlacement } from '../models';

export interface INavAction {
  icon?: string;
  label?: string;
  type?: ActionType;
  className?: string;
  click?: Function;
  placement?: ActionPlacement;
  menu?: boolean | string;
  url?: string;
  image?: string;
  children?: INavAction[]
}
