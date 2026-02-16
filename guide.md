# Hướng dẫn sử dụng Website "Happy New Year"

Website chúc mừng năm mới dành tặng Như Quỳnh đã hoàn tất! Dưới đây là hướng dẫn để bạn mở và tùy chỉnh món quà này.

## 1. Cách mở website
- Bạn hãy mở thư mục chứa các file này (`d:\happynewyear`).
- Tìm file `index.html`.
- Click đúp chuột vào file `index.html` để mở nó trên trình duyệt web (Chrome, Edge, Safari, v.v.).
- Nhấn vào nút **"Mở Quà 🎁"** để bắt đầu hiệu ứng.

## 2. Tùy chỉnh (Nâng cao)

### Thêm Nhạc (Quan trọng) 🎵
Hiện tại website chưa có file nhạc thực tế. Để thêm nhạc:
1.  Chuẩn bị một file nhạc định dạng `.mp3` mà bạn nghĩ Như Quỳnh sẽ thích.
2.  Đổi tên file nhạc thành `music.mp3` (hoặc tên bất kỳ).
3.  Nếu tên file không phải là `music.mp3`, hãy mở file `index.html` bằng Notepad hoặc Code Editor, tìm dòng:
    ```html
    <source src="music.mp3" type="audio/mp3">
    ```
    và đổi `music.mp3` thành tên file của bạn.
4.  Copy file nhạc vào **cùng thư mục** với file `index.html`.

### Thay đổi lời chúc 📝
Để thay đổi lời chúc xuất hiện trên màn hình:
1.  Mở file `script.js`.
2.  Tìm phần `const messages = [...]`.
3.  Bạn có thể sửa nội dung trong dấu ngoặc kép `"..."`.

### Thay đổi ảnh đại diện 🌸
Hiện tại đang dùng biểu tượng hoa 🌸. Để thay bằng ảnh thật:
1.  Chuẩn bị ảnh của Như Quỳnh, đặt tên là `avatar.jpg`.
2.  Mở `index.html`, tìm dòng:
    ```html
    <span class="avatar-icon">🌸</span>
    ```
3.  Thay thế dòng đó bằng:
    ```html
    <img src="avatar.jpg" alt="Như Quỳnh" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">
    ```


### Mobile & Responsive 📱
Website đã được tối ưu hiển thị tốt trên cả điện thoại và máy tính. Bạn có thể gửi link cho Như Quỳnh xem trên điện thoại để có trải nghiệm mượt mà nhất!

Chúc bạn thành công và Như Quỳnh sẽ thích món quà này! Happy New Year! ✨
