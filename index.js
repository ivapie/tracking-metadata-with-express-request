const express = require('express');
const app = express();
const expressip = require('express-ip');
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use(expressip().getIpInfoMiddleware);
app.use('/static', express.static(__dirname + '/public'));
app.set("PORT", PORT);

app.get('/', function (req, res) {
  const ipInfo = req.ipInfo;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const agent = req.headers['user-agent']
  const user = req.param('uid')
  let data = {ipInfo, user, agent, ip}
  console.log( data )
  res.sendfile( './public/boruca2.jpg' );
});

app.listen(app.get('PORT'), function () {
      console.log('Express started on http://localhost:' +
                app.get('PORT') + '; press Ctrl-C to terminate.');
});
