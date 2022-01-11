import React from "react";
import { Header, Box, ValueGroup, Section } from "@admin-bro/design-system";

const clientDetails = ({ record: { params } }) => {
  const balance = params["balance"];
  const childrenCount = params["childrenCount"];
  console.log(childrenCount);

  return (
    <>
      <ValueGroup label="Fils">
        <Section marginBottom={18}>
          <ValueGroup
            value={childrenCount.leftChildsCount.toString()}
            label="Gauche"
          />
          <ValueGroup
            value={childrenCount.rightChildsCount.toString()}
            label="Droit"
          />
        </Section>
      </ValueGroup>
      <ValueGroup label="Solde">
        <Section marginBottom={18}>
          <ValueGroup
            value={balance.totalAmount.toLocaleString() + " TND"}
            label="Montant total"
          />
          <ValueGroup
            value={balance.paidAmount.toLocaleString() + " TND"}
            label="Montant payé"
          />
          <ValueGroup
            value={
              (balance.totalAmount - balance.paidAmount).toLocaleString() +
              " TND"
            }
            label="Montant impayé"
          />
        </Section>
      </ValueGroup>
    </>
  );
};

export default clientDetails;
