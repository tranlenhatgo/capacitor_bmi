# BMI Calculator App

## Mô tả
Ứng dụng tính toán chỉ số BMI (Body Mass Index) giúp người dùng nhập chiều cao, cân nặng để xác định tình trạng cơ thể (Gầy, Bình thường, Thừa cân, Béo phì). Hỗ trợ chụp ảnh và chia sẻ kết quả.

## Tính năng chính
- Tính toán chỉ số BMI từ chiều cao và cân nặng.
- Chụp ảnh trực tiếp bằng camera.
- Chia sẻ kết quả BMI kèm thông tin cá nhân.
- Gửi thông báo cục bộ khi có kết quả BMI.

## Cài đặt
1. Cài đặt các gói cần thiết:
    ```bash
    npm install
    npm install @capacitor/core @capacitor/cli @capacitor/android
    ```
2. Khởi tạo Capacitor:
    ```bash
    npx cap init bmi-calculator com.example.bmicalculator
    ```
3. Đồng bộ hóa với Android:
    ```bash
    npx cap sync
    ```

## Chạy ứng dụng
1. Mở Android Studio:
    ```bash
    npx cap open android
    ```
2. Chạy ứng dụng trên thiết bị thật hoặc trình giả lập.

## Công nghệ sử dụng
- React
- Capacitor (Camera, Share, Local Notifications)
