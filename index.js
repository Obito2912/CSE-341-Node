const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const mongodb = require('./data/database');
const mainRoute = require('./routes/index');

const app = express();

const PORT = process.env.PORT || 3003;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', mainRoute);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  app.listen(PORT, () => {
    console.log(`Database is listening and node is running on port: ${PORT}`);
  });
});
