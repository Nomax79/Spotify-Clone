# 🎵 Spotify Clone

Spotify Clone được xây dựng bằng **TypeScript, Next.js, React, Tailwind CSS** và **NextAuth** để mô phỏng chức năng của Spotify.

## 🚀 Công nghệ sử dụng
- **Next.js** - Framework React cho SSR và SEO tốt hơn.
- **TypeScript** - Giúp code an toàn và dễ bảo trì.
- **Tailwind CSS** - Framework CSS tiện lợi.
- **NextAuth.js** - Xác thực người dùng với Spotify API.
- **Spotify Web API** - Lấy dữ liệu từ Spotify.

## 🔧 Cài đặt
### 1️⃣ Clone repository
```sh
git clone https://github.com/your-username/spotify-clone.git
cd spotify-clone
```

### 2️⃣ Cài đặt dependencies
```sh
npm install -g npm
```

### 3️⃣ Cấu hình môi trường
Tạo file `.env.local` và thêm thông tin Spotify API:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```


### 4️⃣ Chạy dự án
```sh
npm run dev
```
Mở trình duyệt tại `http://localhost:3000`


## 🚀 Mở rộng
- 🎵 **Tích hợp trình phát nhạc Spotify**.
- 📜 **Thêm danh sách phát cá nhân hóa**.
- 🎚 **Tạo giao diện tùy chỉnh với Tailwind CSS**.
