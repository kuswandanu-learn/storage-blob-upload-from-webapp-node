if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const
      express = require('express')
    , router = express.Router()
    , containerName = 'images'
    , config = require('../config')
;

router.get('/:fileName', (req, res, next) => {

    const fileName = req.params["fileName"];

    res.render('detail', { 
        title: fileName,
        image: fileName,
        accountName: config.getStorageAccountName(),
        containerName: containerName,
        result: ""
    });

});

module.exports = router;