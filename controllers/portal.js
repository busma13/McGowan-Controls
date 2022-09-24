module.exports = {
    getPortal: (req,res)=>{
        res.render('portal.ejs', { user: req.user, pageName: 'Employee Portal', url: 'portal' })
    }
}    