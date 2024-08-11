import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  ListItem,
  UnorderedList,
  Button,
  Flex,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import axios from "axios"
import { filterContext } from "../../context/FilterContext";
import jwt_decode from "jwt-decode"
function Pc() {
  const {screen, sort, color}  = useContext(filterContext);
  const toast = useToast();
  const [products, setProducts] = useState([]);
 const [decodedToken, setDecodedToken] = useState({}); 
  const [token, setToken] = useState("")

  const getProducts = async() =>{
    const {data} = await axios.get(`http://localhost:8080/api/products?sort=${sort}&screen=${screen}&color=${color}`);
    setProducts(data.data)
  }
  useEffect(() => {
    getProducts();
  }, [screen, sort, color]);

  useEffect(() => {
  const t = localStorage.getItem("token");

  if (t) {
    setToken(t);
    const detoken = jwt_decode(t)
  setDecodedToken(detoken)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}, []); 



 axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleAddToCart = async (product) => {
  try {
    const response = await axios.post("http://localhost:8080/cart/add", {
      userId: decodedToken.userID,
      img: {
        img1:product.img.img1,
        img2:product.img.img2,
        img3:product.img.img3,
        img4:product.img.img4,
        img5:product.img.img5,
      },
      title: product.title,
      processor: product.processor,
      windows: product.windows,
      screen: product.screen,
      force: product.force,
      storage: product.storage,
      price: product.price,
      cprice: product.cprice,
      color: product.color,
      quantity: 1, 
    });

    if (response.status === 201) {
      // Product successfully added to the cart
      toast({
        title: "ADDED",
        description: "Product Added To Cart",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      // Handle any error conditions here
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    // Handle the error and display an error toast message
    toast({
      title: "Error",
      description: "Failed to add product to cart, login first",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
};


  return (
    <Box bg="#222">
      <Box bg="black" textAlign="center" p={10}>
        <Heading fontSize={20} color="white" mt={10}>
          PC
        </Heading>
        <Flex justifyContent="space-evenly" w="60%" m="auto" mt={5}>
          <Link>
            <Heading fontSize={12} color="#44d62c">
              LAPTOPS
            </Heading>
          </Link>
          <Link>
            <Heading fontSize={12} color="#999999">
              MONITORS
            </Heading>
          </Link>
          <Link>
            <Heading fontSize={12} color="#999999">
              DESKTOPS & CASES
            </Heading>
          </Link>
          <Link>
            <Heading fontSize={12} color="#999999">
              EGPUS
            </Heading>
          </Link>
          <Link>
            <Heading fontSize={12} color="#999999">
              ACCESSORIES
            </Heading>
          </Link>
          <Link>
            <Heading fontSize={12} color="#999999">
              ACCESSORIES
            </Heading>
          </Link>
          <Link>
            <Heading fontSize={12} color="#999999">
              COOLING
            </Heading>
          </Link>
        </Flex>
      </Box>

      <Flex justifyContent="center" mt="20px">
        <Box w="20%" h="500px" color="white" mr="10px">
          <Filter />
        </Box>
        <Grid w="70%" gridTemplateColumns="repeat(3,1fr)" gap="20px" ml="5%">
          {products?.length > 0 &&
            products?.map((e, index) => {
              return (
                <GridItem
                  key={index}
                  alignItems="center"
                  bg="#252525"
                  color="white"
                >
                  <Image src={e.img.img1} w="100%" m="auto"></Image>
                  <Box bg="black" p={5} textAlign="left">
                    <Text ml="-5px" fontSize={25}>
                      {e.title}
                    </Text>
                    <UnorderedList color="#999999" mt="20px" mb="20px">
                      <ListItem>{e.processor}</ListItem>
                      <ListItem>
                        {e.screen}&nbsp;inch Full HD
                      </ListItem>
                      <ListItem>{e.force}</ListItem>
                      <ListItem>{e.windows}</ListItem>
                      <ListItem>{e.force}</ListItem>
                    </UnorderedList>

                    <Link to={`/productDetails/${e._id}`}>View Details</Link>
                    <br></br>
                    <Text>US$&nbsp;{e.price} </Text>
                    <Text textDecor="line-through" color="#999999">
                      US$&nbsp;{e.cprice}{" "}
                    </Text>
                    <Button
                      bg="#44d62c"
                      mt="20px"
                      w="45%"
                      onClick={() => handleAddToCart(e)}
                    >
                      Add To Cart
                    </Button>
                  </Box>
                </GridItem>
              );
            })}
        </Grid>
      </Flex>
    </Box>
  );
}

export default Pc;