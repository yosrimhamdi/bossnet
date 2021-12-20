import React from "react";
import { Header, Box } from "@admin-bro/design-system";

const Intro = ({ admin }) => {
  const adminRole =
    (admin.isSuperuser && "Superuser") ||
    (!admin.role && "Rôle vide") ||
    admin.role.name;
  return (
    <Box className="intro" color="white">
      <Header.H1 marginBottom={0} fontWeight="bold">
        Bienvenue, {admin.fullName}!
      </Header.H1>
      <Header.H6 marginBottom={42}>{adminRole}</Header.H6>
    </Box>
  );
};

export default Intro;
