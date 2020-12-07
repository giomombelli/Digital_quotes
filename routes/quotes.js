const express = require("express");
const admin = require("firebase-admin");

const serviceaccount = require("./../ServiceApplication.json");

const router = express.Router();

admin.initializeApp({
    credential: admin.credential.cert(serviceaccount)
});

const db = admin.firestore();

router.delete("/quotes/:id", async (req, res) => {
    try {

        if(!req.body.quote){
            return res.status(400).json({message: "You have to pass a quote"});
        }

        if(!req.body.author){
            return res.status(400).json({message: "You have to pass a author"});
        }

        const q = await db.collection('quotes').doc(req.params.id).get();
        if(!q.data()){
            return res.status(404).json({message: "quote not found"});
        }


        db.collection("quotes").doc(req.params.id).delete();
        
        return res.status(200).json({message: "Deleted"});

    } catch (error) {
        return res.status(500).send(error);
    }
});


module.exports = router;