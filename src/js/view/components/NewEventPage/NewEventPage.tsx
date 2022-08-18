import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ButtonPrimary,
  Input,
  InputDate,
  TextBodyStandard,
  TitleH1,
} from "../../elements";
import { pushLocalStorage } from "../../../utils/localStorage";

export const NewEventPage = () => {
  const { t } = useTranslation();
  // 3. Форма нового мероприятия
  const username = "TestUser";
  const SERVER_URL =
    process.env.REACT_APP_SERVER || "https://tracking-organizer.herokuapp.com";

  const localStorageTripObjects = "trip_objects";

  // const [newTripErrors, setNewTripErrors] = useState<string>("");

  const [newTripName, setNewTripName] = useState<string>("");
  const [newTripStartDate, setNewTripStartDate] = useState<string>(
    new Date().toISOString()
  );
  const [newTripEndDate, setNewTripEndDate] = useState<string>(
    new Date().toISOString()
  );
  const [newTripDescription, setNewTripDescription] = useState<string>("");

  const onNewTripNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTripName(event.target.value);
  };

  const onStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewTripStartDate(new Date(event.target.value).toISOString());

  const onEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewTripEndDate(new Date(event.target.value).toISOString());

  const onNewTripDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => setNewTripDescription(event.target.value);

  const onNewTripSubmit = async () => {
    const response = await fetch(
      `${SERVER_URL}/Trip/CreateTrip?author_name=${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTripName,
          description: newTripDescription,
          start: newTripStartDate,
          end: newTripEndDate,
        }),
      }
    );

    interface INewTripResponse {
      trip_uid: string;
      member_uid: string;
    }

    if (response.ok) {
      const json: INewTripResponse =
        (await response.json()) as INewTripResponse;
      const { trip_uid, member_uid } = json;

      const memberTripObj = { trip_uid, member_uid };

      pushLocalStorage(localStorageTripObjects, JSON.stringify([memberTripObj]))
        .then(
          () => {},
          () => {}
        )
        .catch(() => {});
    } else {
      interface IErrorResponse {
        detail: {
          loc: string[];
          msg: string;
          type: string;
        }[];
      }

      const errorResponse = (await response.json()) as IErrorResponse;
      let errorMessage = "";
      errorResponse.detail.forEach((error) => {
        errorMessage += `${error.msg}. \n`;
      });
      console.error(errorMessage);
      // setNewTripErrors(errorMessage);
    }
  };
  useEffect(() => {
    console.log("newTripName ", newTripName);
  }, [newTripName]);
  // const isBtnDisabled = !newTripName || newTripName.length === 0;
  return (
    <div
      className="min-h-screen
      flex flex-col h-100
      justify-between md:justify-start
      px-4 pt-16 xs:pt-16 pb-6 mx-auto
      sm:w-6/12
      w-full"
    >
      <div>
        <div className="mb-6">
          <TitleH1>{t("pages.new_event.title")}</TitleH1>
        </div>
        <div className="mb-4">
          <div className="mb-2">
            <TextBodyStandard className="dark:text-dark-3">
              {t("pages.new_event.event_name")}
            </TextBodyStandard>
            <TextBodyStandard className="dark:text-dark-3">*</TextBodyStandard>
          </div>
          <Input
            value={newTripName}
            onChange={onNewTripNameChange}
            placeholder={`${t("pages.new_event.example")}, ${t(
              "pages.new_event.event_name_example"
            )}`}
          />
        </div>
        <div className="mb-4">
          <div className="mb-2">
            <TextBodyStandard className="dark:text-dark-3">
              {t("pages.new_event.dates")}
            </TextBodyStandard>
          </div>
          <div className="flex">
            <div className="mr-4">
              <InputDate
                value={newTripStartDate}
                onChange={onStartDateChange}
                type="date"
                placeholder={`${t("pages.new_event.date_start")}: ${t(
                  "pages.new_event.example"
                )}, 12.06.2022`}
              />
            </div>
            <div>
              <InputDate
                value={newTripStartDate}
                onChange={onEndDateChange}
                type="date"
                placeholder={`${t("pages.new_event.date_end")}: ${t(
                  "pages.new_event.example"
                )}, 12.06.2022`}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-2">
            <TextBodyStandard className="dark:text-dark-3">
              {t("pages.new_event.description")}
            </TextBodyStandard>
          </div>
          <textarea
            onChange={onNewTripDescriptionChange}
            rows={3}
            className="textarea w-full px-4 py-3
          focus:outline-none bg-light-2 text-black-4
          dark:bg-black-2 dark:text-light-0
          placeholder:text-dark-4 placeholder:dark:text-dark-2
          focus:dark:placeholder:text-light-0 focus:placeholder:text-black-4
          hover:placeholder:text-dark-3 hover:dark:placeholder:text-dark-3
          hover:text-dark-3"
            placeholder={`${t("pages.new_event.example")}, ${t(
              "pages.new_event.description_example"
            )}`}
          />
        </div>
      </div>
      {/* eslint-disable-next-line no-void */}
      <ButtonPrimary type="submit" onClick={() => void onNewTripSubmit()}>
        {t("buttons.create")}
      </ButtonPrimary>
    </div>
  );
};