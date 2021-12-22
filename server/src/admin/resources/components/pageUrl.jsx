import React from "react";
import { ValueGroup } from "@admin-bro/design-system";

const copyUrlField = ({ record: { id } }) => {
  const pageURL = `/custom-pages/${id}`;

  return <ValueGroup value={pageURL} label="Lien de page" />;
};

export default copyUrlField;
