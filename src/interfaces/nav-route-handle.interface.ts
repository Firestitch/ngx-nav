import { NavAction } from '../models/nav-action.model';

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
  className?: string;
  click?: Function;
  left?: boolean;
  menu?: boolean;
}
