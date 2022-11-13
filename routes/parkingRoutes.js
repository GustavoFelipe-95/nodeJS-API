const router            = require('express').Router();
const ParkingController = require('../controller/ParkingController');

router.post('/', ParkingController.entered);
router.put('/:id/pay', ParkingController.payment);
router.put('/:id/out', ParkingController.left);
router.get('/:id', ParkingController.history);
router.delete('/', ParkingController.deleteTest);

module.exports = router;