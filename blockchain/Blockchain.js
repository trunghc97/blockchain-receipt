const crypto = require('crypto');
const BlockModel = require('../api/models/Block');

class Block {
    constructor(index, timestamp, data, prevHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash('sha256')
            .update(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data))
            .digest('hex');
    }

    async save() {
        const blockData = {
            index: this.index,
            timestamp: this.timestamp,
            data: this.data,
            prevHash: this.prevHash,
            hash: this.hash
        };
        const block = new BlockModel(blockData);
        await block.save();
        return block;
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.initializeFromDB();
    }

    async initializeFromDB() {
        try {
            const blocks = await BlockModel.find().sort({ index: 1 });
            if (blocks.length === 0) {
                // Nếu DB trống, lưu genesis block
                await this.chain[0].save();
            } else {
                // Nếu có dữ liệu, load từ DB
                this.chain = blocks.map(block => new Block(
                    block.index,
                    block.timestamp,
                    block.data,
                    block.prevHash
                ));
            }
        } catch (error) {
            console.error('Error initializing blockchain from DB:', error);
        }
    }

    createGenesisBlock() {
        return new Block(0, Date.now().toString(), 'Genesis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    async addBlock(newData) {
        const lastBlock = this.getLatestBlock();
        const newBlock = new Block(
            lastBlock.index + 1,
            Date.now().toString(),
            newData,
            lastBlock.hash
        );
        
        // Lưu block mới vào MongoDB
        await newBlock.save();
        
        this.chain.push(newBlock);
        return newBlock;
    }

    async getAllBlocks() {
        try {
            return await BlockModel.find().sort({ index: 1 });
        } catch (error) {
            console.error('Error getting blocks from DB:', error);
            return this.chain;
        }
    }
}

module.exports = Blockchain;