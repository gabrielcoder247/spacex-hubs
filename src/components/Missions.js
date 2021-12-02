import React from "react";
import { useDispatch } from "react-redux";

import { joinMission } from "Redux/Missions";

const Missions = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button type="button" onClick={() => dispatch(joinMission())}>
        Join Mission{" "}
      </button>{" "}
    </div>
  );
};

export default Missions;
