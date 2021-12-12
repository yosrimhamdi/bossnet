import React from 'react';
import { TableCell} from '@admin-bro/design-system'


const copyUrlField = ({record: {params}}) => {
    return `${params['profile.firstName']} ${params['profile.lastName']}`
  }
  
export default copyUrlField
