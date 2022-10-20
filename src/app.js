require('dotenv').config();
const Server = require('./models/server.model');
const pkg = require('../package.json');



const server = new Server();

server.app.set('pkg', pkg)
console.log(pkg);

server.app.get('/api', (req, res) => {
    res.json({
        app: server.app.get('pkg').name,
        author: server.app.get('pkg').author,
        description: server.app.get('pkg').description,
        version: server.app.get('pkg').version,
        url_docs: server.app.get('pkg').url_docs
    })
})


server.listen();

