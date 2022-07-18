import React from "react";
import { TextBodySmall, TitleH3 } from "../../elements/typo";
import { KebabIcon } from "../../icons";
import { Indicator } from "../../elements";
import { dateToStringDDMMYYYY } from "../../../utils/date";

export interface EventListItemProps {
  tripUid: string;
  title: string;
  description?: string;
  dateStart?: Date;
  dateEnd?: Date;
}

export const EventListItem = (props: EventListItemProps) => {
  const { tripUid, title, description, dateStart, dateEnd } = props;
  let start;
  let end;
  if (dateStart) {
    start = dateToStringDDMMYYYY(dateStart);
  }
  if (dateEnd) {
    end = dateToStringDDMMYYYY(dateEnd);
  }
  return (
    <div
      id={tripUid}
      className="flex w-full items-center justify-content-between h-fit border-b border-light-2 dark:border-black-3 pb-3 cursor-pointer"
    >
      <div className="mr-3 w-full">
        <div className="mb-3">
          <TitleH3>{title}</TitleH3>
          <TextBodySmall className="text-dark-3 mt-1">
            {description || ""}
          </TextBodySmall>
        </div>
        <div>
          <Indicator isActive />
          <TextBodySmall className="ml-1">{start || ""}</TextBodySmall>
          <TextBodySmall className="ml-1">{`- ${end || ""}`}</TextBodySmall>
        </div>
      </div>
      <KebabIcon
        size={12}
        className="cursor-pointer dark:text-dark-2 text-dark-4"
      />
    </div>
  );
};
