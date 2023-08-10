const GridFile = require("../models/GridFile");
const fs = require("fs");
const mime = require("mime");
// const getContentTypeFromExt = require("../utils/utils");

module.exports = {
  getDocuments: async (req, res) => {
    console.log(req.user);
    try {
      const documentsList = await GridFile.find({}).sort({
        uploadDate: "desc",
      });
      res.render("documents.ejs", {
        user: req.user,
        pageName: "Documents",
        url: "docs",
        listItems: documentsList,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getSingleDocument: async (req, res) => {
    // console.log(req.user);
    try {
      const singleDocument = await GridFile.findById(req.params.documentId);
      // console.log(singleDocument);

      if (!singleDocument || singleDocument.length === 0) {
        res.status(404).json({ error: "file not found" });
      }
      const contentType = mime.getType(singleDocument.filename);
      console.log("Content-Type: ", contentType);
      res.setHeader("Content-Type", contentType);
      const documentStream = singleDocument.getDownloadStream();
      documentStream.pipe(res);
    } catch (err) {
      console.log(err);
    }
  },
  getSingleDocumentForDownload: async (req, res) => {
    console.log(req.user);
    try {
      const singleDocument = await GridFile.findById(req.params.documentId);

      if (singleDocument) {
        const contentType = mime.getType(singleDocument.filename);
        console.log("Content-Type: ", contentType);
        res.setHeader("Content-Type", contentType);
        res.attachment(singleDocument.filename);
        singleDocument.downloadStream(res);
      } else {
        // file not found
        res.status(404).json({ error: "file not found" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  addDocument: async (req, res) => {
    try {
      console.log("addDocument request body: ", req.body);
      console.log("addDocument request files: ", req.files);
      if (req.files) {
        const tagsArray = req.body.tags.split(" ");
        const promises = req.files.map(async (file) => {
          const contentType = mime.getType(file.originalname);
          const fileStream = fs.createReadStream(file.path);
          const gridFile = new GridFile({
            filename: file.originalname,
            metadata: {
              contentType: contentType,
              favorited: false,
              tags: tagsArray,
            },
          });
          await gridFile.upload(fileStream);
          fs.unlinkSync(file.path);
        });

        await Promise.all(promises);
      }
      console.log("Document added successfully");
      res.redirect("/docs");
    } catch (err) {
      console.log(err);
    }
  },
  // createPriceListItem: async (req, res)=>{
  //     try{
  //         console.log(req.body)
  //         await PriceListItem.create({ itemName: req.body.itemName, itemPrice: req.body.itemPrice, note: req.body.itemNote, priceListId: req.params.listId })
  //         console.log('Price list item has been added!')
  //         res.redirect(`/priceLists/${req.params.listId}`)
  //     }catch(err){
  //         console.log(err)
  //     }
  // },
  // favoritePriceList: async (req, res)=>{
  //     try {
  //         if (req.query.favorited === 'true') {
  //             await Document.findByIdAndUpdate(req.params.listId, {'favorite' : false})
  //             console.log('List removed from favorites')
  //             // res.json('List removed from favorites')
  //             res.redirect('/priceLists')

  //         } else {
  //             await Document.findByIdAndUpdate(req.params.listId, {'favorite' : true})
  //             console.log('List added to favorites')
  //             // res.json('List added to favorites')
  //             res.redirect('/priceLists')
  //         }

  //     } catch (err) {
  //         console.log(err)
  //     }
  // },
  // editPriceListItem: async (req, res)=>{
  //     try {
  //         let key = req.body.column;
  //         let obj = {[key]: req.body.cellContent}
  //         await PriceListItem.findByIdAndUpdate(req.params.itemId, obj)
  //         console.log('Price List Item Updated')
  //         res.json('Price list item updated')
  //     } catch (err) {
  //         console.log(err)
  //     }
  // },
  deleteDocument: async (req, res) => {
    try {
      await GridFile.findByIdAndRemove(req.params.documentId);
      console.log("Document Deleted");
      res.redirect("/docs");
    } catch (err) {
      console.log(err);
    }
  },
  // deletePriceListItem: async (req, res)=>{
  //     try{
  //         await PriceListItem.findByIdAndRemove(req.params.itemId)
  //         console.log('Deleted Price List Item')
  //         res.redirect(`/priceLists/${req.params.listId}`)
  //     }catch(err){
  //         console.log(err)
  //     }
  // }
};
