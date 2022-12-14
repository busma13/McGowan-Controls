const PriceList = require('../models/PriceList')
const PriceListItem = require('../models/PriceListItem')

module.exports = {
    getPriceLists: async (req,res)=>{
        console.log(req.user)
        try{
            const listItems = await PriceList.find().sort({favorite: "desc"}).collation({locale:'en',strength: 2}).sort({listName: 1})
            res.render('priceLists.ejs',  { user: req.user, pageName: 'Price Lists', url: 'priceLists', listItems: listItems})
        }catch(err){
            console.log(err)
        }
    },
    getSinglePriceList: async (req,res)=>{
        console.log(req.user)
        try{
            const singleListItems = await PriceListItem.find({priceListId: req.params.listId}).sort('itemName')
            const priceListName = await PriceList.findById(req.params.listId)
            console.log(singleListItems)
            res.render('singlePriceList.ejs',  { user: req.user, pageName: `Price List - ${priceListName.listName}`, url: `priceLists/${req.params.listId}`, listItems: singleListItems, listId: req.params.listId }) //change priceLists url
        }catch(err){
            console.log(err)
        }
    },
    createPriceList: async (req, res)=>{
        try{
            console.log(req.body)
            await PriceList.create({listName: req.body.newListName})
            console.log('Price list has been added!')
            res.redirect('/priceLists')
        }catch(err){
            console.log(err)
        }
    },
    createPriceListItem: async (req, res)=>{
        try{
            console.log(req.body)
            await PriceListItem.create({ itemName: req.body.itemName, itemPrice: req.body.itemPrice, note: req.body.itemNote, priceListId: req.params.listId })
            console.log('Price list item has been added!')
            res.redirect(`/priceLists/${req.params.listId}`)
        }catch(err){
            console.log(err)
        }
    },
    favoritePriceList: async (req, res)=>{
        try {
            if (req.query.favorited === 'true') {
                await PriceList.findByIdAndUpdate(req.params.listId, {'favorite' : false})   
                console.log('List removed from favorites')
                // res.json('List removed from favorites')
                res.redirect('/priceLists')

            } else {
                await PriceList.findByIdAndUpdate(req.params.listId, {'favorite' : true})   
                console.log('List added to favorites')
                // res.json('List added to favorites')
                res.redirect('/priceLists')
            }
            
        } catch (err) {
            console.log(err)
        }
    },
    editPriceListItem: async (req, res)=>{
        try {
            let key = req.body.column;
            let obj = {[key]: req.body.cellContent}
            await PriceListItem.findByIdAndUpdate(req.params.itemId, obj)   
            console.log('Price List Item Updated')
            res.json('Price list item updated')
        } catch (err) {
            console.log(err)
        }
    },
    deletePriceList: async (req, res)=>{
        try{
            await PriceList.findByIdAndRemove(req.params.listId)
            console.log('Deleted Price List')
            res.redirect('/priceLists')
        }catch(err){
            console.log(err)
        }
    },
    deletePriceListItem: async (req, res)=>{
        try{
            await PriceListItem.findByIdAndRemove(req.params.itemId)
            console.log('Deleted Price List Item')
            res.redirect(`/priceLists/${req.params.listId}`)
        }catch(err){
            console.log(err)
        }
    }
}    