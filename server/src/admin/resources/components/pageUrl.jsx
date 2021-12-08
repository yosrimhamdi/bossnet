import React from 'react';
import { ValueGroup} from '@admin-bro/design-system'

const CLIENT_ENDPOINT = "http://localhost:8080";

const copyUrlField = ({ record : {id} }) => {
    const pageURL = `${CLIENT_ENDPOINT}/custom-pages/${id}`;

    return (
        <ValueGroup
            value={pageURL}
            label="Lien de page"
        />
    )
  }
  
export default copyUrlField

