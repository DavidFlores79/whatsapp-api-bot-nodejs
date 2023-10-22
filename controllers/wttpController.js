const messagebird = require('messagebird').initClient('8mfubHRxfKk67yhkXaODH2bDa');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const MESSAGE_BIRD_URI = process.env.MESSAGE_BIRD_URI;
const MESSAGE_BIRD_KEY = process.env.MESSAGE_BIRD_ACCESS_KEY;

const getConversations = async (req, res) => {

    const response = await fetch(`${MESSAGE_BIRD_URI}/conversations`, {
        method: 'GET',
        headers: {
            'Authorization' : `AccessKey ${MESSAGE_BIRD_KEY}`,
            'Content-Type' : 'application-json'
        }
    });

    const data = await response.json();
    res.status(200).send({data});
}

const getMessages = async (req, res) => {

    const { id } = req.params;

    if(!id) {
        return res.status(404).send({
            msg: `No se encontró información con el id: ${id}`
        })
    }

    const response = await fetch(`${MESSAGE_BIRD_URI}/conversations/${id}/messages?limit=20`, {
        method: 'GET',
        headers: {
            'Authorization' : `AccessKey ${MESSAGE_BIRD_KEY}`,
            'Content-Type' : 'application-json'
        }
    });

    const data = await response.json();
    res.status(200).send({data});
}

const sendMessage = async (req, res) => {

    const body = req.body;
    
    console.log({dataRaw: body});

    const response = await fetch(`${MESSAGE_BIRD_URI}/send`, {
        method: 'POST',
        headers: {
            'Authorization' : `AccessKey ${MESSAGE_BIRD_KEY}`,
            'Content-Type' : 'application-json'
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    res.status(200).send({data});
}

const uploadFile = async (req, res) => {

    const files = req.files;
    const img_path = files.file.path;
    // const img_name = img_path.split('\\')[1];
    const img_name = img_path.split('/')[1];
    const url=`https://whatsapp-api-bot-nodejs-production.up.railway.app/api/v1/get_resource/${img_name}`;

    console.log({files});

    res.status(200).send({data:url});
}

const getResource = async (req, res) => {

    const name = req.params['name'];
    // console.log({name});
    fs.stat(`./uploads/${name}`, (err) => {
        if(err) {
            let path_img = './uploads/default.png';
            return res.status(200).sendFile(path.resolve(path_img));
        }

        let path_img = `./uploads/${name}`;
        res.status(200).sendFile(path.resolve(path_img));
    });


}

module.exports = {
    getConversations,
    getMessages,
    sendMessage,
    uploadFile,
    getResource,
}


// messagebird.conversations.list(20, 0, function (err, response) {
//     if (err) {
//       return console.log(err);
//     }
    
//     res.send({
//         data: response
//     })
//   });