import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Divider,
  Icon,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { SlDiamond } from "react-icons/sl";
import { BsBox, BsBoxArrowRight, BsBoxArrowLeft } from "react-icons/bs";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContextprovider";
import axios from "axios";
export function OnclickCart() {
  const navigate = useNavigate();
  const { auth } = useContext(authContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const toast = useToast()

  const borderColor = "#888";
  const [animationInterval, setAnimationInterval] = useState(null);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8080/user/logout", {}, {withCredentials: true});
      console.log(response);

      if (response.data) {
        toast({
          title: response.data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/login"); // Redirect to the login page
      }
    } catch (error) {
      toast({
        title: "Logout failed",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!isOpen && animationInterval) {
      clearInterval(animationInterval);
      setAnimationInterval(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <>
      <Icon
        as={BsFillCartPlusFill}
        _hover={{ color: "white", cursor: "pointer" }}
        color="#888888"
        boxSize="6"
        ref={btnRef}
        onClick={onOpen}
      ></Icon>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          bg="#222"
          css={css`
            border: 2px solid ${borderColor};
            transition: border-color 1s linear;
          `}
        >
          <DrawerCloseButton color="#888" />
          <DrawerHeader>
            <Center>
              <Text color="#888" mt="20px">
                Dashboard
              </Text>
            </Center>
          </DrawerHeader>

          <DrawerBody>
              <Button
                _hover={{ color: "rgb(69,214,43)" }}
                color="white"
                leftIcon={<FiShoppingCart boxSize={6} />}
                variant="liqued"
                onClick={()=>{
                  navigate("/cart")
                  onClose()
                }}
              >
                Cart
              </Button>
            <Divider color="#888" orientation="horizontal" />
            <Button
              _hover={{ color: "rgb(69,214,43)" }}
              color="white"
              leftIcon={<BsBox boxSize={6} />}
              variant="liqued"
              onClick={()=>{
                  navigate("/orders")
                  onClose()
                }}
            >
              Orders
            </Button>
            <Divider orientation="horizontal" />
            <Button
              _hover={{ color: "rgb(69,214,43)" }}
              color="white"
              leftIcon={<VscAccount boxSize={6} />}
              variant="liqued"
              onClick={()=>{
                  navigate("/profile")
                  onClose()
                }}
            >
              Profile
            </Button>
            <Divider orientation="horizontal" />
            <Button
              _hover={{ color: "rgb(69,214,43)" }}
              color="white"
              leftIcon={<SlDiamond boxSize={6} />}
              variant="liqued"
              onClick={()=>{
                  navigate("/rewards")
                  onClose()
                }}
            >
              Rewards
            </Button>
            <Divider orientation="horizontal" />

            <Button
              _hover={{ color: "rgb(69,214,43)" }}
              color="white"
              leftIcon={<FaStore boxSize={6} />}
              variant="liqued"
              onClick={()=>{
                  navigate("/store")
                  onClose()
                }}
            >
              Store
            </Button>
            <Divider orientation="horizontal" />

            {auth ? (
              <Button
                _hover={{ color: "rgb(69,214,43)" }}
                color="white"
                leftIcon={<BsBoxArrowRight boxSize={6} />}
                variant="liqued"
                onClick={() => {
                  handleLogout();
                  onClose();
                }}
              >
                Log out
              </Button>
            ) : (
              <Button
                _hover={{ color: "rgb(69,214,43)" }}
                color="white"
                leftIcon={<BsBoxArrowLeft boxSize={6} />}
                variant="liqued"
                onClick={onClose}
              >
                <Link to={"/login"}>Log in</Link>
              </Button>
            )}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
