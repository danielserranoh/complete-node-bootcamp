const http = require("http");
const url = require("url");
const fs = require("fs");
const { truncate } = require("fs").promises;

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

const template_overview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const template_card = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const template_product = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const data_obj = JSON.parse(data);

const slugs = data_obj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  //console.log(url.parse(req.url, true));
  const { query, pathname } = url.parse(req.url, true);
  //console.log(query);
  //console.log(pathname);
  //const path_name = req.url;
  // OVERVIEW
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const cards_html = data_obj
      .map((el) => replaceTemplate(template_card, el))
      .join("");
    const output = template_overview.replace(/{%PRODUCTCARDS%}/, cards_html);
    res.end(output);

    //PRODUCT
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const product = data_obj[query.id];
    const output = replaceTemplate(template_product, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
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
