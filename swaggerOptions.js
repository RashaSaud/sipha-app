const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Title',
        version: '1.0.0',
        description: 'API description'
      }
    },
    apis: ['./routes/*.js'] // Replace with your route files
  };