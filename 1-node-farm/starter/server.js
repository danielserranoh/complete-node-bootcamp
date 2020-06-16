const http = require("http");
const url = require("url");
const fs = require("fs");

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic)
    output = output.replace(/{%NOTORGANIC%}/g, "not-organic");
  return output;
};

const template_overview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const template_card = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const tempplate_product = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const data_obj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);

  const path_name = req.url;
  // OVERVIEW
  if (path_name === "/" || path_name === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const cards_html = data_obj
      .map((el) => replaceTemplate(template_card, el))
      .join("");
    const output = template_overview.replace(/{%PRODUCTCARDS%}/, cards_html);
    res.end(output);

    //PRODUCT
  } else if (path_name === "/product") {
    res.end("This is the product");

    // API
  } else if (path_name === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "Secuoyas-header": "Secuoyas",
    });
    res.end("Page not found 404!");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listenting to request on port 8000");
});
