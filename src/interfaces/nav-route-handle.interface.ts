import { NavActionType } from '../models';

export interface UrlInfoAction {
  icon?: string;
  label?: string;
  type?: NavActionType;
  className?: string;
  click?: Function;
  url?: string;
  image?: string;
}
