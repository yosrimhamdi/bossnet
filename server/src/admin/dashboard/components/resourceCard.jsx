import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Header, Box, Badge } from "@admin-bro/design-system";

const ResourceCard = ({ resource: { id, name, counts } }) => {
  return (
    <RouterLink
      className="resourceCard"
      to={`${window.location.pathname}/resources/${id}`}
    >
      <Header.H5 marginBottom={0} marginRight={8}>
        {name}
      </Header.H5>
      <Box>
        {counts.today ? (
          <Badge variant="info" marginRight={4}>
            +{counts.today}
          </Badge>
        ) : null}
        <Badge variant="primary">{counts.all}</Badge>
      </Box>
    </RouterLink>
  );
};

export default ResourceCard;
