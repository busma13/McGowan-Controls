const PriceList = require('../models/PriceList')
const PriceListItem = require('../models/PriceListItem')

module.exports = {
    getPriceLists: async (req,res)=>{
        console.log(req.user)
        try{
            const listItems = await PriceList.find()
            res.render('priceLists.ejs',  { user: req.user, pageName: 'Price Lists', url: 'priceLists', listItems: listItems})
        }catch(err){
            console.log(err)
        }
    },
    getSinglePriceList: async (req,res)=>{
        console.log(req.user)
        try{
            const singleListItems = await PriceListItem.find({priceListId: req.params.id})
            res.render('singlePriceList.ejs',  { user: req.user, pageName: `Price List - ${req.params.listName}`, url: 'priceLists',listItems: singleListItems }) //change priceLists url
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
    deletePriceList: async (req, res)=>{
        try{
            await PriceList.remove({_id:req.params.id})
            console.log('Deleted Price List')
            res.redirect('/priceLists')
        }catch(err){
            console.log(err)
        }
    }
}    