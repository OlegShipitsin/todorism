import { ICommonListPoint, IListPoint } from "../../../../interfaces";

export interface IListPointEditProps {
  listPoint: IListPoint | ICommonListPoint | null;
  isCreationMode: boolean;
  onClick: (listPoint: IListPoint) => void;
}
