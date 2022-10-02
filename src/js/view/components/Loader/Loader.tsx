import React, { useEffect, useState } from "react";
import { LoaderIcon } from "../../icons";
import { getLoadingStateFromLocalStorage } from "../../../utils/localStorage";

export const Loader = () => {
  const [loadingState, setLoadingState] = useState<boolean | null>(false);

  const loadingStateFromLocalStorage = getLoadingStateFromLocalStorage();

  useEffect(() => {
    setLoadingState(loadingStateFromLocalStorage);
  }, [loadingStateFromLocalStorage]);

  return (
    <>
      {!loadingState && <div />}
      {loadingState && (
        <div className="flex justify-center items-center absolute h-full w-full bg-black-3/40 z-20">
          <LoaderIcon size={64} className="animate-spin" />
        </div>
      )}
    </>
  );
};
