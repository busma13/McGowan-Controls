const Pilot = require('../models/Pilot')

module.exports = {
    getProductID: async (req,res)=>{
        console.log(req.user)
        try{
            // const listItems = await PriceList.find().sort({favorite: "desc"}).collation({locale:'en',strength: 2}).sort({listName: 1})
            res.render('productID.ejs',  { user: req.user, pageName: 'Product ID', url: 'productID'}) //, listItems: listItems
        }catch(err){
            console.log(err)
        }
    },
    // getSinglePriceList: async (req,res)=>{
    //     console.log(req.user)
    //     try{
    //         const singleListItems = await PriceListItem.find({priceListId: req.params.listId}).sort('itemName')
    //         const priceListName = await PriceList.findById(req.params.listId)
    //         console.log(singleListItems)
    //         res.render('singlePriceList.ejs',  { user: req.user, pageName: `Price List - ${priceListName.listName}`, url: `priceLists/${req.params.listId}`, listItems: singleListItems, listId: req.params.listId }) //change priceLists url
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
}    