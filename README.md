# Blockchain Receipt API

Một API RESTful để lưu trữ và xác thực các receipt (biên lai) sử dụng công nghệ blockchain và QR code.

## Tính năng

- Lưu trữ receipt dưới dạng blockchain
- Tạo QR code cho mỗi block để chia sẻ và xác thực
- Xác thực receipt thông qua QR code
- Lưu trữ dữ liệu trong MongoDB
- API RESTful
- Docker containerization

## Yêu cầu hệ thống

- Node.js 16+
- Docker và Docker Compose
- MongoDB

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd blockchain-receipt
```

2. Cài đặt dependencies:
```bash
cd api
npm install
```

3. Tạo file .env (tùy chọn):
```bash
MONGODB_URI=mongodb://mongodb:27017/blockchain
PORT=3000
```

## Chạy ứng dụng

### Sử dụng Docker (Khuyến nghị)

```bash
docker-compose up --build
```

### Chạy locally

1. Đảm bảo MongoDB đang chạy
2. Chạy server:
```bash
cd api
npm run dev
```

## API Endpoints

### 1. Tạo Block Mới

```http
POST /api/blocks
Content-Type: application/json

{
  "data": {
    "amount": 100000,
    "description": "Payment for services",
    "date": "2024-03-20"
  }
}
```

Response:
```json
{
  "block": {
    "index": 1,
    "timestamp": "1710921600000",
    "data": {
      "amount": 100000,
      "description": "Payment for services",
      "date": "2024-03-20"
    },
    "prevHash": "...",
    "hash": "..."
  },
  "qrCode": "data:image/png;base64,..."
}
```

### 2. Lấy Tất Cả Blocks

```http
GET /api/blocks
```

### 3. Xác Thực Block từ QR Code

```http
POST /api/blocks/verify
Content-Type: application/json

{
  "qrData": "..."
}
```

Response:
```json
{
  "isValid": true,
  "block": {
    "index": 1,
    "timestamp": "1710921600000",
    "data": {
      "amount": 100000,
      "description": "Payment for services",
      "date": "2024-03-20"
    },
    "prevHash": "...",
    "hash": "..."
  },
  "message": "Block is valid"
}
```

## Cấu Trúc Project

```
blockchain-receipt/
├── api/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── blockchainController.js
│   ├── models/
│   │   └── Block.js
│   ├── routes/
│   │   └── blockchainRoutes.js
│   ├── services/
│   │   └── qrService.js
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── blockchain/
│   └── Blockchain.js
├── docker-compose.yml
└── README.md
```

## Công nghệ sử dụng

- Node.js & Express.js
- MongoDB & Mongoose
- QR Code generation
- Docker & Docker Compose
- Blockchain implementation
- Nodemon (development)

## Phát triển

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

## Bảo mật

- Sử dụng SHA-256 cho hash blocks
- Xác thực toàn vẹn dữ liệu thông qua blockchain
- Xác thực QR code

## License

MIT License
