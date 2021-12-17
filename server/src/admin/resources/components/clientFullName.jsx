import React from 'react';

const clientFullName = ({record: {params}}) => {
    return `${params['profile.firstName']} ${params['profile.lastName']}`
  }
  
export default clientFullName
