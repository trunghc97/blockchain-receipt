const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/blockchainController');

// Get all blocks
router.get('/', blockchainController.getAllBlocks.bind(blockchainController));

// Add new block
router.post('/', blockchainController.addBlock.bind(blockchainController));

// Verify block from QR
router.post('/verify', blockchainController.verifyBlock.bind(blockchainController));

module.exports = router; 