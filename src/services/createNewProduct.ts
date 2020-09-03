//Import of created files
import api from "./apiBling";

//This function will create a new product within the bling using the variable that represents the api, receives the apikey and a String that represents an XML
async function createNewProduct(key, xml) {
  api
    .post("produto/json/", null, {
      params: {
        apikey: key,
        xml: xml,
      },
    })
    .then((ress) => {
      console.log(`Data has been successfully entered into Bling.`);
    })
    .catch((err) => {
      console.log("Unexpected mistake, may the force be with you 😥");
    });
}

export default createNewProduct;
