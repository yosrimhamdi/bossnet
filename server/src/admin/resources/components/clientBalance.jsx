import React from "react";
import { Header, Box, ValueGroup, Section } from "@admin-bro/design-system";

const clientBalance = (props) => {
  console.log({ props });
  const record = props.record;
  const params = record.params;
  const balance = params["balance"];
  const fullName = `${params["profile.firstName"]} ${params["profile.lastName"]}`;
  return (
    <Box variant="white">
      <Header.H2 marginBottom={4} marginTop={0} fontWeight="bold">
        Solde
      </Header.H2>
      <Section>
        <ValueGroup
          value={balance.totalAmount + " TND"}
          label="Montant total"
        />
        <ValueGroup value={balance.paidAmount + " TND"} label="Montant payé" />
        <ValueGroup
          value={balance.totalAmount - balance.paidAmount + " TND"}
          label="Montant impayé"
        />
      </Section>
      <Header.H2 marginBottom={4} marginTop={24} fontWeight="bold">
        Client
      </Header.H2>
      <Section>
        <ValueGroup value={fullName} label="Nom complet" />
        <ValueGroup value={params["email"]} label="E-mail" />
        <ValueGroup value={params["rib"]} label="Rib" />
        <ValueGroup value={params["cinId"]} label="cin" />
      </Section>
    </Box>
  );
};

export default clientBalance;
