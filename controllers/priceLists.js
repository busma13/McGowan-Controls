const PriceList = require('../models/PriceList')

module.exports = {
    getPriceLists: async (req,res)=>{
        console.log(req.user)
        try{
            const listItems = await PriceList.find()
            res.render('priceLists.ejs', {listItems: priceLists})
        }catch(err){
            console.log(err)
        }
    },
    createPriceList: async (req, res)=>{
        try{
            await PriceList.create({listName: req.body.newListName})
            console.log('Price list has been added!')
            res.redirect('/priceLists')
        }catch(err){
            console.log(err)
        }
    },
    deletePriceList: async (req, res)=>{
        try{
            await PriceList.findOneAndDelete({_id:req.params.id})
            console.log('Deleted Price List')
            res.redirect('/priceLists')
        }catch(err){
            console.log(err)
        }
    }
}    