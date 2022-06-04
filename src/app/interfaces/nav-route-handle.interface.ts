import { NavActionType } from '../models/nav-action.model';

export interface UrlInfoAction {
  icon?: string;
  label?: string;
  type?: NavActionType;
  className?: string;
  click?: (event: any) => void;
  url?: string;
  image?: string;
}
