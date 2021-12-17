import React from 'react';


const locationEmbedMap = ({ record : {params} }) => {
    const embedMapIframe = params["location.embedMapIframe"];
    if (embedMapIframe && embedMapIframe.startsWith("<iframe") && embedMapIframe.endsWith("</iframe>")){
        return (
            <div dangerouslySetInnerHTML={{
                __html: embedMapIframe
            }}></div>
        )
    }
    return null;
  }
  
export default locationEmbedMap