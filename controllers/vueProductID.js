const Pilot = require("../models/Pilot");

module.exports = {
  getProductIDPage: async (req, res) => {
    console.log(req.user);
    try {
      res.render("vueProductID.ejs", {
        user: req.user,
        pageName: "Product ID",
        url: "productID",
        productsList: null,
        vueScriptSrc: "https://unpkg.com/vue@3.0.2",
      });
    } catch (err) {
      console.log(err);
    }
  },
  getProductIDPilot: async (req, res) => {
    console.log(req.user);
    try {
      let selectValues = req.query.selectValues.split(",");
      let prefix = req.query.modelPrefixPCP;
      console.log("selectValues: ", selectValues);
      console.log("prefix: ", prefix);

      let pilotsList, query;
      if (prefix === "110") {
        if (selectValues.includes("all")) {
          query = { prefix: "110" };
        } else {
          query = { prefix: 110, connectorNumber: Number(selectValues[0]) };
        }
      } else {
        // 116 pilot
        query = {
          prefix: 116,
          configurationLetter: selectValues[0],
          typeNumber: Number(selectValues[1]),
          coilNumber: Number(selectValues[2]),
          connectorNumber: Number(selectValues[3]),
          whereUsed: selectValues[4],
        };

        if (selectValues.includes("all")) {
          selectValues.forEach((value, idx) => {
            // console.log('value: ', value, ' idx: ', idx)
            if (value === "all") {
              removeUnusedQuerySelector(query, idx);
            }
          });
        }
      }

      console.log("query: ", query);
      pilotsList = await Pilot.find(query, "modelNumber").sort("modelNumber");

      console.log("pilotsList:", pilotsList);
      res.json(pilotsList);
    } catch (err) {
      console.log(err);
    }
  },
};

function removeUnusedQuerySelector(query, index) {
  switch (index) {
    case 0:
      delete query["configurationLetter"];
      break;
    case 1:
      delete query["typeNumber"];
      break;
    case 2:
      delete query["coilNumber"];
      break;
    case 3:
      delete query["connectorNumber"];
      break;
    case 4:
      delete query["whereUsed"];
      break;
  }
}

// Use as a template to update filed names in a collection
// Pilot.updateMany({ prefix: 116}, {$rename:{revisionLetter:"configurationLetter"}}, { multi: true }, function(err, blocks) {
//     if(err) { throw err; }
//     console.log('done!');
// });
