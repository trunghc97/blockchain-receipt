const crypto = require('crypto');

function generateReceiptHash(receipt) {
    // Chọn thứ tự các trường để đảm bảo nhất quán hash
    const receiptData = [
        receipt.sender,
        receipt.receiver,
        receipt.amount,
        receipt.txTime,
        receipt.txId
    ].join('|');
    return crypto.createHash('sha256').update(receiptData).digest('hex');
}

module.exports = generateReceiptHash;