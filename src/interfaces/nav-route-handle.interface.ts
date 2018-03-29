import { NavAction, ActionType } from '../models';

export interface UrlInfo {
  title?: string;
  actions?: NavAction[];
  menuActions?: NavAction[];
  leftActions?: NavAction[];
  isRoot?: boolean;
}

export interface UrlInfoAction {
  icon?: string;
  label?: string;
  type?: ActionType;
  className?: string;
  click?: Function;
  left?: boolean;
  menu?: boolean;
}
