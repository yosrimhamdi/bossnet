import React, { useState, useEffect } from "react";
import { ApiClient } from "admin-bro";
import { Loader, Box, MessageBox, Header } from "@admin-bro/design-system";
import Intro from "./intro";
import NavGroupCard from "./navGroupCard";

const api = new ApiClient();

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [data, setData] = useState({
    resourcesByGroups: [],
    admin: {},
  });

  useEffect(() => {
    setFetchError(false);
    setIsLoading(true);
    api
      .getDashboard()
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setFetchError(true);
      });
  }, []);
  if (fetchError)
    return (
      <Box padding={24}>
        <MessageBox message="Erreur" variant="danger" size="lg">
          <Header.H1 marginBottom={24} fontWeight="bold">
            Oups !
          </Header.H1>
          <br />
          Quelque chose s'est mal passé
          <br />
          Veuillez réessayer.
        </MessageBox>
      </Box>
    );
  if (isLoading) return <Loader />;
  return (
    <div className="dashboard">
      <Intro admin={data.admin} />
      <Box className="nav-groups">
        {data.resourcesByGroups.map((groupedResources) => (
          <NavGroupCard
            key={groupedResources.navGroup.name}
            groupedResources={groupedResources}
          />
        ))}
      </Box>
    </div>
  );
};

export default Dashboard;
