import {
  Box,
  Text,
  Flex,
  Image,
  ListItem,
  UnorderedList,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
  CartBigWhiteText,
  CartGrayText,
} from "./CartTextDecoration";
import { useEffect, useState } from "react";
function CartProductCard({ item }) {

   const [token, setToken] = useState(""); // State to store the token

  // Function to fetch the token from localStorage and set it in the state
  const fetchToken = () => {
    const t = localStorage.getItem("token");
    setToken(t);
  };

  useEffect(() => {
    fetchToken(); // Fetch the token when the component mounts
  }, []);


const handleQuantity = async (newQuantity) => {
  try {
    // Ensure that the new quantity is within the range [1, 5]
    newQuantity = Math.min(Math.max(newQuantity, 1), 5);

    // Make a PUT request to update the quantity for this item
    const response = await axios.put(
      `http://localhost:8080/cart/update/${item._id}`,
      { quantity: newQuantity }, // Move the quantity to the data object
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};


  const handleDelete = async () => {
    try {
      // Make a DELETE request to remove this item from the cart
      const response = await axios.delete(`http://localhost:8080/cart/remove/${item._id}`, {
      headers:{
        "Authorization": "Bearer " + token
      }
      });

      // If the item is successfully deleted, call the removeFromCart function to remove it from the UI
      // if (response.status === 200) {
      //   removeFromCart(item._id);
      // }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Flex justify="space-between" p="20px 0px">
      <Flex width="60%">
        <Box mr="30px">
          <Image w="100px" src={item.img.img1} />
        </Box>
        <Box>
          <CartBigWhiteText t={item.title} />
          <UnorderedList>
            <ListItem>
              <CartGrayText t={item.force} />
            </ListItem>
            <ListItem>
              <CartGrayText t={item.processor} />
            </ListItem>
            <ListItem>
              <CartGrayText t={item.storage} />
            </ListItem>
          </UnorderedList>
        </Box>
      </Flex>
      <Flex w="30%" justify="space-between">
        <Flex>
          <Box>
            <IconButton
      variant="outline"
      colorScheme="black"
      icon={<AddIcon />}
      size="xs"
      onClick={() => {
        handleQuantity(item.quantity + 1);
      }}
      isDisabled={item.quantity >= 5}
    />
          </Box>
          <Box w="40px" align="center">
            <Text>{item.quantity}</Text>
          </Box>
          <Box>
           <IconButton
      variant="outline"
      colorScheme="black"
      icon={<MinusIcon />}
      size="xs"
      onClick={() => {
        handleQuantity(item.quantity - 1);
      }}
      isDisabled={item.quantity <= 1}
    />
          </Box>
          <Box ml={"20px"}>
            <IconButton
              variant="outline"
              colorScheme="black"
              icon={<DeleteIcon />}
              size="xs"
              onClick={handleDelete}
            />
          </Box>
        </Flex>
        <Box>
          <CartBigWhiteText t={`US$${item.cprice}`} />
        </Box>
      </Flex>
    </Flex>
  );
}

export default CartProductCard;