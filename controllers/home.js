module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs', { pageName: 'McGowan Controls', url: '' })
    }
}