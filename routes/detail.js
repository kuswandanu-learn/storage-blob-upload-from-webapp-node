if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const
      express = require('express')
    , router = express.Router()
    , containerName = 'images'
    , config = require('../config')
    , request = require('request')
;

router.get('/:fileName', (req, res, next) => {

    const fileName = req.params["fileName"];

    const options = {
        uri: config.getCognitiveServicesEndpoint(),
        qs: {
            'visualFeatures': 'Categories,Description,Color',
            'details': '',
            'language': 'en'
        },
        body: '{"url": ' + '"https://' + config.getStorageAccountName() + '.blob.core.windows.net/' + containerName + '/' + fileName + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': config.getCognitiveServicesKey()
        }
    };

    request.post(options, (error, response, body) => {
        if (error) {
            res.status(500);

            res.render('error', {
                title: 'Error',
                message: 'There was an error connecting to cognitive services.',
                error: error
            });
        }
        else {
            let jsonResponse = JSON.stringify(JSON.parse(body), null, 2);

            res.render('detail', { 
                title: fileName,
                image: fileName,
                accountName: config.getStorageAccountName(),
                containerName: containerName,
                result: jsonResponse
            });
        }
    });

});

module.exports = router;