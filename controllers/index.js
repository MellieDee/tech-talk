const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);


// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
//   res.status(404).end();
// });


// router.use((req, res) => {
//   res.status(404).end();
// });

module.exports = router;