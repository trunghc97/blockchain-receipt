const QRCode = require('qrcode');

class QRService {
    static async generateQR(data) {
        try {
            const qrData = JSON.stringify({
                blockIndex: data.index,
                hash: data.hash,
                timestamp: data.timestamp
            });
            return await QRCode.toDataURL(qrData);
        } catch (error) {
            throw new Error('Error generating QR code: ' + error.message);
        }
    }

    static async verifyQRData(qrData) {
        try {
            const data = JSON.parse(qrData);
            if (!data.blockIndex || !data.hash || !data.timestamp) {
                throw new Error('Invalid QR data format');
            }
            return data;
        } catch (error) {
            throw new Error('Error parsing QR data: ' + error.message);
        }
    }
}

module.exports = QRService; 