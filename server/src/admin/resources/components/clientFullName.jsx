import React from 'react';
import { TableCell} from '@admin-bro/design-system'


const clientFullName = ({record: {params}}) => {
    return `${params['profile.firstName']} ${params['profile.lastName']}`
  }
  
export default clientFullName
