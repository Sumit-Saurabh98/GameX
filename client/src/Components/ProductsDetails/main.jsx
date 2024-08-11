import { Grid,Flex,Box,useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import ImageComp from './Image';
import CardComp from './Crad';

function Main({ldata}) {
    const isSmallScreen = useBreakpointValue({ base: false, md: true });
    if (isSmallScreen) {
    return (
         <Flex>
               
    
           <Box w="70%">
            <ImageComp />
            </Box>
           
           <CardComp  /> 
         </Flex>
    );
    }else{
        return(
            <Grid>
              <Box w="100%">
            <ImageComp/>
            </Box>
           
           <CardComp />  
            </Grid>
        )
    }
}

export default Main;