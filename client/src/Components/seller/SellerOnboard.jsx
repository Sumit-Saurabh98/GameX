import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Box,
  Center,
  Heading,
  Text,
  Button,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  HStack,
  Divider,
  useToast,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { BsFacebook, BsTwitch } from "react-icons/bs";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SiAccenture } from "react-icons/si";
import { useNavigate, Link } from "react-router-dom";

function SellerOnboard() {
  const [gstNumber, setGstNumber] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const validation = () => {
    if (!profileImage || !businessType || gstNumber) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const handleRoleChange = async (e) => {
    e.preventDefault();
    if (validation) {
      try {
      } catch (error) {}
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://razerid-assets.razerzone.com/static/media/serpents-eye-v2-20220906.dae1e41f.jpg)",
        backgroundPosition: "center top -150px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Box
          border={"2px"}
          borderColor={"green"}
          mt="20px"
          w="412px"
          h="auto"
          py="20"
          bg="#000000"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Heading
            ml="20px"
            my="30px"
            as={"h1"}
            fontWeight={"thin"}
            color={"white"}
            size="lg"
            pb="30"
          >
            Seller Onboarding
          </Heading>
          <Box
          w="20"
          h="20"
          borderRadius="full"
          bg="green"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb="20px"
          >

          </Box>
          <form onSubmit={handleRoleChange}>
            <Input
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              mb="20px"
              width="375px"
              ml={"20px"}
              isRequired
              focusBorderColor="rgb(69,214,43)"
              color={"white"}
              type="file"
              placeholder="EMAIL ADDRESS"
            />
            <Input
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              width="375px"
              ml={"20px"}
              mb="5"
              color={"white"}
              focusBorderColor="rgb(69,214,43)"
              pr="4.5rem"
              type="text"
              placeholder="Gst Number"
            />
            <Select
              placeholder="Business Type"
              width="375px"
              ml={"20px"}
              mb="5"
              color={"white"}
              focusBorderColor="rgb(69,214,43)"
              onChange={(e) => setBusinessType(e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </Select>
            <Center>
              <Button colorScheme="green" color="black" type="submit">
                {loading ? <Spinner size="sm" /> : "Become Seller"}{" "}
                {/* Show loading spinner */}
              </Button>
            </Center>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default SellerOnboard;
