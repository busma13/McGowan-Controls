const Pilot = require('../models/Pilot')

module.exports = {
    getProductIDPage: async (req,res)=>{
        console.log(req.user)
        try{
            res.render('productID.ejs',  { user: req.user, pageName: 'Product ID', url: 'productID', productsList: null})
        }catch(err){
            console.log(err)
        }
    },
    getProductIDPilot: async (req,res)=>{
        console.log(req.user)
        try{
            // const listItems = await PriceList.find().sort({favorite: "desc"}).collation({locale:'en',strength: 2}).sort({listName: 1})
            let selectValues = req.query.selectValues.split(',')
            let prefix = req.query.modelPrefixPCP
            console.log('selectValues: ', selectValues)
            console.log('prefix: ', prefix)
            
            let pilotsList, query
            if (prefix === '110') {
                if (selectValues.includes('all')) {
                    query = {prefix: '110'}
                } else {
                    query = {prefix: '110', connectorNumber: selectValues[0]}
                }
                pilotsList = await Pilot.find(query, 'modelNumber').sort('modelNumber')
            } else { // 116 pilot
                query = {prefix: '116', revisionLetter: selectValues[0], typeNumber: selectValues[1],coilNumber: selectValues[2], connectorNumber: selectValues[3], whereUsed: selectValues[4]}

                if (selectValues.includes('all')) {
                    selectValues.forEach((value, idx) => {
                        console.log('value: ', value, ' idx: ', idx)
                        if (value === 'all') {
                            removeUnusedQuerySelector(query, idx)
                        }
                        console.log('query: ', query)
                    })
                    
                }
                pilotsList = await Pilot.find(query, 'modelNumber').sort('modelNumber')

            } 
            console.log('pilotsList:', pilotsList)
            res.json(pilotsList)
        }catch(err){
            console.log(err)
        }
    },
}    

function removeUnusedQuerySelector(query, index) {
    console.log(query, index)
    switch (index) {
        case 0:
            delete query['revisionLetter']
            break
        case 1:
            delete query['typeNumber']
            break
        case 2:
            delete query['coilNumber']
            break
        case 3:
            delete query['connectorNumber']
            break
        case 4:
            delete query['whereUsed']
            break
    }
    console.log('remove final query: ', query)
}