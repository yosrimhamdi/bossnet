import React from "react";
import { Header, Box, Icon } from "@admin-bro/design-system";
import ResourceCard from "./resourceCard";

const NavGroupCard = ({ groupedResources: { navGroup, resources } }) => {
  return (
    <Box
      variant="card"
      borderRadius={8}
      marginBottom={24}
      marginX={12}
      width={"100%"}
    >
      <Box
        borderBottomWidth={2}
        borderStyle="dashed"
        borderColor="whitesmoke"
        marginBottom={24}
        flex
        flexDirection="row"
      >
        <Icon icon={navGroup.icon} color="gray" size={32}></Icon>
        <Header.H4 fontWeight="bold" marginTop={0} marginLeft={12}>
          {navGroup.name}
        </Header.H4>
      </Box>
      <Box flex flexDirection="row" flexWrap="wrap">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </Box>
    </Box>
  );
};

export default NavGroupCard;
