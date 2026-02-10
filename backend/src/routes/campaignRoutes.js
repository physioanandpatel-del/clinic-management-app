const express = require('express');
const CampaignController = require('../controllers/campaignController');

const router = express.Router();

router.get('/', CampaignController.getAllCampaigns);
router.post('/', CampaignController.createCampaign);
router.get('/:id', CampaignController.getCampaignById);
router.put('/:id', CampaignController.updateCampaign);
router.delete('/:id', CampaignController.deleteCampaign);
router.post('/:id/send', CampaignController.sendCampaign);
router.get('/:id/results', CampaignController.getCampaignResults);

module.exports = router;