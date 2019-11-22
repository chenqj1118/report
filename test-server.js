var app = require("webpack-dev-web-test");

app.start({
		testPubPath: 'static'
	},
	function(app){
		app.post('./report.json', function(req, resp) {
			resp.send(require("./static/report.json"));
		});
	}
	
);
