// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import axios from "axios";
import { FC } from "react";

// ||||||||||||||||||||||||||||| page Component ||||||||||||||||||||||||||||||||||||

interface IpageProps {}

const page: FC<IpageProps> = ({}) => {

  const data = {
    // Your request parameters here
  };
  
  // Make the PUT request using Axios
  axios.put("http://localhost/3000/api", data)
    .then(response => {
      // Handle the response data
      console.log('PUT request successful', response.data);
    })
    .catch(error => {
      // Handle any errors
      console.error('Error making PUT request', error);
    })
  // Return
  return (
    <div>
      <p>page Component</p>
    </div>
  );
};
export default page;
