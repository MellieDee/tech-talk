// const router = require('express').Router();

// const apiRoutes = require('.api');
// //const homeRoutes = require('./home-routes.js');
// // const dashboardRoutes = require('./dashboard-routes.js');

// //router.use('/', homeRoutes);
// // router.use('/dashboard', dashboardRoutes);
// router.use('', apiRoutes);

// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
//   res.status(404).end();
// });

// module.exports = router;

const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;