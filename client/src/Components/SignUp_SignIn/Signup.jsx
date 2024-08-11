import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import {
  Box,
  Center,
  Heading,
  Text,
  Button,
  Stack,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  HStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { BsFacebook, BsTwitch } from "react-icons/bs";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdLogin } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const onChange = () => {
    setCaptcha(true);
  };

  const isValidated = () => {
    let isProceed = true;
    let errorMessage = "Please enter the ";
    if (!name) {
      isProceed = false;
      errorMessage += " Username";
    }
    if (!password) {
      isProceed = false;
      errorMessage += " Password";
    }
    if (!email) {
      isProceed = false;
      errorMessage += " Email";
    }

    if (!isProceed) {
      toast({
        title: errorMessage,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else if (!email.includes("@")) {
      isProceed = false;
      toast({
        title: "Please enter a valid email",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
    return isProceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidated()) {
      setLoading(true); // Set loading to true before API call
      try {
        const response = await axios.post("http://localhost:8080/user/signup", {
          username: name,
          email,
          password,
        });

        console.log(response);

        if (response.data) {
          toast({
            title: response.data.message,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/login");
        }
      } catch (error) {
        toast({
          title: "Signup failed",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } finally {
        setLoading(false); // Reset loading state after API call
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://razerid-assets.razerzone.com/static/media/serpents-eye-v2-20220906.dae1e41f.jpg)",
        backgroundPosition: "center top -150px",
      }}
    >
      <Center>
        <Box
          border={"2px"}
          borderColor={"green"}
          mt="20px"
          w="412px"
          h="auto"
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
            CREATE RAZER ID ACCOUNT
          </Heading>
          <Text ml="20px" mb="40px" color={"white"}>
            Razer ID is a unified account for all Razer services.
          </Text>
          <Stack ml="20px" mt="10px" mb="20px" direction="row" spacing={4}>
            <Button
              px="45px"
              leftIcon={<BsFacebook boxSize="30" />}
              colorScheme="facebook"
              variant="solid"
              aria-label="Facebook"
            ></Button>
            <Button
              px="45px"
              leftIcon={<AiFillGoogleCircle boxSize="30" />}
              colorScheme="gray"
              variant="solid"
              aria-label="Google"
            ></Button>
            <Button
              px="45px"
              leftIcon={<BsTwitch boxSize="30" />}
              colorScheme="purple"
              variant="solid"
              title="Twitch"
            ></Button>
          </Stack>
          <HStack m="auto" w="370px" my={8}>
            <Divider orientation="horizontal" />
            <Text color={"#73767B"}>or</Text>
            <Divider orientation="horizontal" />
          </HStack>
          <form onSubmit={handleSubmit}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              width="375px"
              ml={"20px"}
              mb="20px"
              focusBorderColor="rgb(69,214,43)"
              color={"white"}
              placeholder="RAZER ID (YOUR GAMER NAME)"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb="20px"
              width="375px"
              ml={"20px"}
              focusBorderColor="rgb(69,214,43)"
              color={"white"}
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
                placeholder="PASSWORD"
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
            <Heading
              ml="20px"
              mb={5}
              mt={8}
              as={"h3"}
              fontWeight={"light"}
              color={"white"}
              size="sm"
            >
              Terms and Conditions
            </Heading>
            <Text fontSize="12px" ml="20px" color={"white"}>
              Based on your consent, we will customize advertisements and
              recommendations that may match your interests.
            </Text>
            <Box my={8}>
              <Center>
                <ReCAPTCHA
                  sitekey="6LdecqQlAAAAAF5O-JC8ProsSC_nHykNvfTpWp2B"
                  onChange={onChange}
                />
              </Center>
            </Box>
            <Center>
              <Button
                onClick={handleSubmit}
                colorScheme="green"
                color="black"
                px="100px"
                isDisabled={!captcha || loading} // Disable button if loading or captcha not completed
              >
                {loading ? <Spinner size="sm" /> : "ACCEPT AND CREATE"} {/* Show loading spinner */}
              </Button>
            </Center>
            <Center>
              <Text color={"white"} my={8}>
                Already have an Account
              </Text>
              <Button
                _hover={{ color: "rgb(69,214,43)" }}
                color={"white"}
                leftIcon={<MdLogin size="12px" />}
                colorScheme="blue"
                variant="unstyled"
                ml="2"
                alignItems="center"
              >
                <Link to={"/signin"}>Log in</Link>
              </Button>
            </Center>
          </form>
        </Box>
      </Center>
    </div>
  );
}

export { Signup };