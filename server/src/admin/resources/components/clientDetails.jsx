import React from "react";
import { Header, Box, ValueGroup, Section } from "@admin-bro/design-system";

const clientDetails = ({ record: { params } }) => {
  const { leftRightChildsCountGroupedByTreeHeight, balance } = params;
  const firstLeftRightChildsCountId =
    (leftRightChildsCountGroupedByTreeHeight[0] &&
      leftRightChildsCountGroupedByTreeHeight[0]._id - 1) ||
    0;
  return (
    <>
      <ValueGroup label="Fils">
        <Section marginBottom={18}>
          {leftRightChildsCountGroupedByTreeHeight.map(
            ({ left, right, _id }) => (
              <ValueGroup
                key={_id}
                label={`Ligne ${_id - firstLeftRightChildsCountId}`}
              >
                <Section marginBottom={18}>
                  <ValueGroup value={left.toString()} label="Gauche" />
                  <ValueGroup value={right.toString()} label="Droit" />
                </Section>
              </ValueGroup>
            )
          )}
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
            value={balance.unpaidAmount.toLocaleString() + " TND"}
            label="Montant impayé"
          />
        </Section>
      </ValueGroup>
    </>
  );
};

export default clientDetails;
