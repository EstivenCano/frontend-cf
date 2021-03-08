import React from "react";
import dotenv from 'dotenv'

const Start = () => {
  dotenv.config()
  return (
    <div>
      <h1>{process.env.REACT_APP_HOST}</h1>
    </div>
  );
};

export default Start;
