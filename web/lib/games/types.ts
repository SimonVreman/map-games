import React from "react";

export type GameDefinition = {
  name: string;
  description: string;
  slug: string;
  pages: {
    Description: React.FunctionComponent;
    Game?: React.FunctionComponent;
  };
};
