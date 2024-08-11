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
} from "@chakra-ui/react";
import { BsFacebook, BsTwitch } from "react-icons/bs";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SiAccenture } from "react-icons/si";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../../context/AuthContextprovider";

function Signin() {
  const { toggleAuth } = useContext(authContext);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const proceedLogin = async (e) => {
    e.preventDefault();
    if (validation()) {
      setLoading(true); // Set loading to true before API call
      try {
        const response = await axios.post("http://localhost:8080/user/login", {
          email,
          password,
        }, {withCredentials: true});

        console.log(response);

        // Assuming the response contains a token or user data
        if (response.data) {
          toggleAuth(); // Call toggleAuth to update auth context
          toast({
            title: response.data.message,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/"); 
        }
      } catch (error) {
        toast({
          title: "Login failed",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } finally {
        setLoading(false); // Reset loading state after API call
      }
    }
  };

  const validation = () => {
    let result = true;
    let errorMessage = "Please enter your ";
    if (!email) {
      result = false;
      errorMessage += " Email";
    }
    if (!password) {
      result = false;
      errorMessage += " Password";
    }
    if (!result) {
      toast({
        title: errorMessage,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else if (!email.includes("@")) {
      result = false;
      toast({
        title: "Please enter a valid email",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
    return result;
  };

  return (
    <div
      style={{
        backgroundImage: "url(https://razerid-assets.razerzone.com/static/media/serpents-eye-v2-20220906.dae1e41f.jpg)",
        backgroundPosition: "center top -150px",
        height: "100vh",
      }}
    >
      <Center>
        <Box
          border={"2px"}
          borderColor={"green"}
          mt="20px"
          w="412px"
          h="560px"
          bg="#000000"
        >
          <Heading
            ml="20px"
            my="30px"
            as={"h1"}
            fontWeight={"thin"}
            color={"white"}
            size="lg"
          >
            RAZER ID LOGIN
          </Heading>
          <form onSubmit={proceedLogin}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb="20px"
              width="375px"
              ml={"20px"}
              isRequired
              focusBorderColor="rgb(69,214,43)"
              color={"white"}
              type="email"
              placeholder="EMAIL ADDRESS"
            />
            <InputGroup size="md">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                width="375px"
                ml={"20px"}
                color={"white"}
                focusBorderColor="rgb(69,214,43)"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  colorScheme="liquid"
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                >
                  {show ? (
                    <Icon boxSize={7} as={FiEye} />
                  ) : (
                    <Icon boxSize={7} as={FiEyeOff} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text
              _hover={{ color: "green" }}
              cursor={"pointer"}
              mt={2}
              mr={5}
              mb={8}
              textAlign={"right"}
              fontWeight={"light"}
              color={"white"}
            >
              Forgot Password
            </Text>

            <Center>
              <Button
                type="submit" // Ensure the button submits the form
                colorScheme="green"
                color="black"
                px="160px"
                isLoading={loading} // Disable button if loading
              >
                {loading ? <Spinner size="sm" /> : "LOG IN"}
              </Button>
            </Center>
            <Center>
              <Text color={"white"} fontSize={"13px"} mb="20px" mt={8}>
                Don't have an account yet?
              </Text>
            </Center>
            <Center>
              <Button
                _hover={{ color: "rgb(69,214,43)" }}
                color={"white"}
                rightIcon={<SiAccenture size="12px" />}
                colorScheme="blue"
                variant="unstyled"
              >
                <Link to={"/signup"}>Create Razer ID</Link>
              </Button>
            </Center>
            <HStack m="auto" w="380px" my={4}>
              <Divider orientation="horizontal" />
              <Text color={"#73767B"}>or</Text>
              <Divider orientation="horizontal" />
            </HStack>
            <Stack ml="20px" mt="10px" mb="50px" direction="row" spacing={4}>
              <Button
                px="45px"
                leftIcon={<BsFacebook boxSize="30" />}
                colorScheme="facebook"
                variant="solid"
                aria-label="Facebook"
              />
              <Button
                px="45px"
                leftIcon={<AiFillGoogleCircle boxSize="30" />}
                colorScheme="gray"
                variant="solid"
                aria-label="Google"
              />
              <Button
                px="45px"
                leftIcon={<BsTwitch boxSize="30" />}
                colorScheme="purple"
                variant="solid"
                title="Twitch"
              />
            </Stack>
          </form>
        </Box>
      </Center>
    </div>
  );
}

export { Signin };