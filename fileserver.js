const fs = require('fs');
let http = require('http');

let Configuration = {};
let CertConf = {};
let ServerPort = 80;
let AssetPaths = [ __dirname ];
if (fs.existsSync('./config.json')) {
	Configuration = JSON.parse(fs.readFileSync('./config.json'));
	if (Configuration['ssl'] === true) {
		http = require('https'); 
		CertConf = {
			key: fs.readFileSync(Configuration['key']),
			cert: fs.readFileSync(Configuration['cert']),
			ca: fs.readFileSync(Configuration['ca'])
		}
		ServerPort = Configuration['port'];
	}
	else { ServerPort = Configuration['port']; }
	if (Configuration['assetpaths'] !== undefined) {
		AssetPaths = Configuration['assetpaths'];
	}
}
else {
	fs.writeFileSync('./config.json', JSON.stringify({
		"ssl": false,
		"key": "./cert/privkey.pem",
		"cert": "./cert/cert.pem",
		"ca": "./cert/chain.pem",
		"port": 80,
		"assetpaths": [
			__dirname
		]
	}, null, 4));
}

http.createServer(CertConf, (req, res) => {
	const URLPath = req.url.split("/");
	if (URLPath.includes("..")) { res.writeHead(404); res.end('404: File not found'); return; }
	for (let i in AssetPaths) {
		try {
			// "say 'no' to directory traversal attacks" - some guy i'm in a discord server with, probably
			fs.readFile(AssetPaths[i] + ("/" + URLPath[53] + "/" + URLPath[6]), (err, data) => {
				res.writeHead(200);
				res.end(data);
			});
			return;
		}
		catch { continue; }
	}
}).listen(ServerPort);

console.log('Fileserver started.');
