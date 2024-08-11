import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Checkbox,
} from "@chakra-ui/react";

import { useContext } from "react";
import { filterContext } from "../../context/FilterContext";

function Filter() {

  const {screenChange, colorChange, sortChange}  = useContext(filterContext);

  const handleScreenSize = (screen) =>{
    screenChange(screen);
  }

  const handleSorting = (sort) =>{
    sortChange(sort);
  }

  const handleColor = (color) =>{
    colorChange(color);
  }

  return (
    <div>
      <Accordion allowToggle>
        <AccordionItem p="50px">
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading fontSize={25}>SCREEN SIZES</Heading>
            </Box>
            <AccordionIcon color="#44d62c" />
          </AccordionButton>

          <AccordionPanel>
            <Box textAlign="left">
              <Box>
                <Checkbox
                  defaultunChecked
                  value="13"
                 onChange={(e)=>handleScreenSize(e.target.value)}
                >
                  13 inch
                </Checkbox>
              </Box>
              <Box>
                <Checkbox
                  defaultunChecked
                  value="14"
                   onChange={(e)=>handleScreenSize(e.target.value)}
                >
                  14 inch
                </Checkbox>
              </Box>
              <Box>
                <Checkbox
                  defaultunChecked
                  value="15"
                   onChange={(e)=>handleScreenSize(e.target.value)}
                >
                  15 inch
                </Checkbox>
              </Box>
              <Box>
                <Checkbox
                  defaultunChecked
                  value="16"
                   onChange={(e)=>handleScreenSize(e.target.value)}
                >
                  16 inch
                </Checkbox>
              </Box>
              <Box>
                <Checkbox
                  defaultunChecked
                  value="17"
                   onChange={(e)=>handleScreenSize(e.target.value)}
                >
                  17 inch
                </Checkbox>
              </Box>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem p="50px">
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading fontSize={25}>PRICE</Heading>
            </Box>
            <AccordionIcon color="#44d62c" />
          </AccordionButton>

          <AccordionPanel>
            <Box textAlign="left">
              <Box>
                <Checkbox
                  defaultunChecked
                  value="asc"
                   onChange={(e)=>handleSorting(e.target.value)}
                >
                  LOW YO HIGH
                </Checkbox>
              </Box>
              <Box>
                <Checkbox
                  defaultunChecked
                  value="desc"
                  onChange={(e)=>handleSorting(e.target.value)}
                >
                  HIGH TO LOW
                </Checkbox>
              </Box>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem p="50px">
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading fontSize={25}>COLOR</Heading>
            </Box>
            <AccordionIcon color="#44d62c" />
          </AccordionButton>

          <AccordionPanel>
            <Box textAlign="left">
              <Box>
                <Checkbox
                  defaultunChecked
                  value="Black"
                  onChange={(e)=>handleColor(e.target.value)}
                >
                  BLACK
                </Checkbox>
              </Box>
              <Box>
                <Checkbox
                  defaultunChecked
                  value="Green"
                  onChange={(e)=>handleColor(e.target.value)}
                >
                  GREEN
                </Checkbox>
              </Box>
              <Box>
                <Checkbox
                  defaultunChecked
                  value="Whitesmoke"
                  onChange={(e)=>handleColor(e.target.value)}
                >
                  WHITESMOKE
                </Checkbox>
              </Box>
              <Box>
                <Checkbox
                  defaultunChecked
                  value="Gray"
                  onChange={(e)=>handleColor(e.target.value)}
                >
                  GRAY
                </Checkbox>
              </Box>
              <Box>
                <Checkbox
                  defaultunChecked
                  value="Blue"
                  onChange={(e)=>handleColor(e.target.value)}
                >
                  BLUE
                </Checkbox>
              </Box>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem p="50px">
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading fontSize={25}>SCREEN TYPE</Heading>
            </Box>
            <AccordionIcon color="#44d62c" />
          </AccordionButton>

          <AccordionPanel>
            <Box textAlign="left">
              <Box>
                <Checkbox defaultunChecked>QHD(1)</Checkbox>
              </Box>
              <Box>
                <Checkbox defaultunChecked>FULL HD(20)</Checkbox>
              </Box>
              <Box>
                <Checkbox defaultunChecked>OLED 4K TOUCH</Checkbox>
              </Box>
              <Box>
                <Checkbox defaultunChecked>QHD OLED(6)</Checkbox>
              </Box>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem p="50px">
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading fontSize={25}>REFRESH RATE</Heading>
            </Box>
            <AccordionIcon color="#44d62c" />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Box textAlign="left">
              <Box>
                <Checkbox defaultunChecked>240 Hz(1)</Checkbox>
              </Box>
              <Box>
                <Checkbox defaultunChecked>360 Hz(1)</Checkbox>
              </Box>
              <Box>
                <Checkbox defaultunChecked>60 Hz(1)</Checkbox>
              </Box>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Filter;
