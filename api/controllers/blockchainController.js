const Blockchain = require('../../blockchain/Blockchain');
const QRService = require('../services/qrService');
const BlockModel = require('../models/Block');

class BlockchainController {
    constructor() {
        this.blockchain = new Blockchain();
    }

    async addBlock(req, res) {
        try {
            const newBlock = await this.blockchain.addBlock(req.body);
            const qrCode = await QRService.generateQR(newBlock);
            
            res.json({
                block: newBlock,
                qrCode
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllBlocks(req, res) {
        try {
            const blocks = await this.blockchain.getAllBlocks();
            res.json(blocks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async verifyBlock(req, res) {
        try {
            const { qrData } = req.body;
            
            // Verify QR data format
            const decodedData = await QRService.verifyQRData(qrData);
            
            // Find block in database
            const block = await BlockModel.findOne({
                index: decodedData.blockIndex,
                hash: decodedData.hash,
                timestamp: decodedData.timestamp
            });

            if (!block) {
                return res.status(404).json({
                    isValid: false,
                    message: 'Block not found'
                });
            }

            // Verify block hash
            const verifiedBlock = new Block(
                block.index,
                block.timestamp,
                block.data,
                block.prevHash
            );

            const isValid = verifiedBlock.calculateHash() === block.hash;

            res.json({
                isValid,
                block: isValid ? block : null,
                message: isValid ? 'Block is valid' : 'Block hash is invalid'
            });

        } catch (error) {
            res.status(400).json({
                isValid: false,
                message: error.message
            });
        }
    }
}

module.exports = new BlockchainController(); 