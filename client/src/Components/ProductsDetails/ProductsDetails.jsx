import React from 'react';
import { Box} from '@chakra-ui/react';
import Nav from './Nav';
import Main from './main';
import Details from './Details';
function ProductsDetails() {

    return (
        <Box bg="black" >
         <Nav/>
        
          <Main  />
         <Details/>
        
        </Box>
    );
}

export default ProductsDetails;