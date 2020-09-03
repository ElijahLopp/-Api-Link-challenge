import api from "./apiBling";

async function createNewProduct(key, xml) {
  api
    .post("produto/json/", null, {
      params: {
        apikey: key,
        xml: xml,
      },
    })
    .then((ress) => {
      console.log("Data has been successfully entered into Bling");
    })
    .catch((err) => {
      console.log("Unexpected mistake, may the force be with you 😥");
    });
}

export default createNewProduct;
