import {
  Box,
  Text,
  Flex,
  Image,
  Divider,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
} from "@chakra-ui/react";
import { CartGreenButton } from "./CartGreenButton";
import {
  CartBigWhiteText,
  CartWhiteHeading,
  CartGrayText,
  CartGreenLinkText,
  CartWhiteSmallText,
  CartBlueLinkText,
} from "./CartTextDecoration";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartProductCard from "./CartProductCard"
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import axios from "axios";
import { useContext } from "react";
import { authContext } from "../../context/AuthContextprovider";

export function Cart() {
  const {changePrice, changeTotalItem} = useContext(authContext)
  const navigate = useNavigate()
  const promoCodeRef = useRef(""); // Initialize promo code as an empty string
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0); // State to store the total cart value
  const [aim, setAim] = useState(true)
  
  const toast = useToast();

  // Calculate cart total
  const calculateCartTotal = () => {
    let total = cartItems.length >0 &&  cartItems.reduce((acc, item) =>{
      return acc + item.cprice * item.quantity
    },0)
    return total;
  };

  const getCartData = async (user) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/cart/get/${user}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCartItems(data);
      const currentTotal = calculateCartTotal();
      setCartTotal(currentTotal);
      changePrice(cartTotal)
      changeTotalItem(data.length)
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setToken(token);
      const uId = jwt_decode(token);
    setUserId(uId.userID);
    getCartData(uId.userID);
    }else{
      setAim(false);
    }
    
  }, [userId, token, cartItems]);
  

  // Apply promo code
const applyPromocode = () => {
  const enteredPromoCode = promoCodeRef.current;
  if (enteredPromoCode === "WELCOME30") {
    const currentTotal = calculateCartTotal();
    const discount = (currentTotal * 30) / 100;
    const newTotal = currentTotal - discount;
    setCartTotal(newTotal);
    toast({
      title: "Promo code applied",
      description: `You saved $${discount.toFixed(2)} with promo code.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  } else {
    toast({
      title: "Invalid promo code",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
};



  return (
    <Box bg="black" color="white" pt="100px">
      <Box bg="#1c1c1b">
        <Flex justify="space-between" w="80%" margin="auto" p="25px 0px">
          <CartWhiteHeading t={`Your cart total is US$${cartTotal}`} />
          <Link to="/payment">
            <CartGreenButton
              t={"Checkout"}
              w={"120px"}
            />
          </Link>
        </Flex>
      </Box>
      <Box w="80%" margin="auto">
     {
  aim ? (
    cartItems.length > 0 &&
    cartItems.map((item) => {
      return <CartProductCard item={item} />;
    })
  ) : (
    <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
      <Box fontSize={"4vw"}>Please Sign up /Sign in</Box>
      <CartGreenButton
                    t={"Click here"}
                    w={"100px"}
                    onClick={()=>navigate('/signup')}
                  />
    </Flex>
  )
}

        <Divider />
        <Box p="30px 0px">
          <Flex align="center">
            <Box>
              <CartGreenLinkText t={"Become a RazerStore Rewards member "} />
            </Box>
            <Box pl="3px">
              <CartWhiteSmallText t={"using your Razer ID and earn up to"} />
            </Box>
            <Box>
              <Image
                src="https://www.razer.com/assets/images/silver/zsilver_72x72.png"
                w="18px"
                m="0px 5px"
              />
            </Box>
            <Box>
              <CartWhiteSmallText
                t={`${Math.ceil(cartTotal.current / 20)} with this purchase.`}
              />
            </Box>
          </Flex>
          <CartBlueLinkText
            t={"What is RazerStore Rewards & what can I do with it?"}
          />
        </Box>
        <Divider />
        <Flex justify="space-between" p="100px 0px">
          <Flex align="center" justify="center" display="block" h="80vh">
            <Accordion allowToggle pb="30px">
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box color="#44d62c" as="span" flex="1" textAlign="left">
                      Have a promo code?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Input
                    variant="unstyled"
                    placeholder="Write promocode"
                    size="md"
                    w="300px"
                    onChange={(e) => {
                      promoCodeRef.current = e.target.value;
                    }}
                  />
                  <CartGreenButton
                    t={"Apply"}
                    w={"100px"}
                    onClick={applyPromocode}
                  />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <CartGrayText t={"Actual sales tax will be calculated later"} />
            <CartGrayText t={"upon entry of your billing/shipping address."} />
          </Flex>
          <Flex display="block" justify="right" w="50%">
            <Flex justify="space-between">
              <Box>
                <CartBigWhiteText t={"Subtotal"} />
                <CartGrayText t={"Excludes local taxes"} />
              </Box>
              <Box>
                <CartBigWhiteText t={`US$${cartTotal}`} />
              </Box>
            </Flex>
            <Flex justify="space-between" p="20px 0px">
              <Box>
                <CartBigWhiteText t={"Shipping"} />
              </Box>
              <Box>
                <Text fontSize="2xl" color="#999">
                  Calculated after address entry
                </Text>
                <Text></Text>
              </Box>
            </Flex>
            <Divider />
            <Flex justify="space-between" p="20px 0px">
              <Box>
                <CartBigWhiteText t={"Your Total"} />
              </Box>
              <Box>
                <CartBigWhiteText t={`US$${cartTotal}`} />
              </Box>
            </Flex>
            <Flex justify="right">
              <Box>
                <Link to="/payment">
                  <CartGreenButton
                    t={"Checkout"}
                    w={"120px"}
                    // onClick={saveTotalAmount}
                  />
                </Link>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}