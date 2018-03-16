import { NavAction } from '../models/nav-action.model';

export interface UrlInfo {
  title?: string;
  actions?: NavAction[];
  menuActions?: NavAction[];
}

export interface UrlInfoAction {
  icon?: string;
  label?: string;
  className?: string;
  click?: Function;
  menu?: boolean;
}
