### Tổng quan

#### Công nghệ sử dụng

API này được viết bằng NestJS (sử dụng Typescript), với TypeORM (Postgresql) làm database.
Dùng OpenAPI Swagger để quản lý các API, JSON Web Token để chứng thực người dùng.
Mô hình quan hệ giữa các bảng như hình sau:
![Database relationship](./relationship.svg)
<img src="./relationship.svg">

Riêng bảng School được thiết kế như sau:
![School relationship](./school-relationship.svg)
<img src="./school-relationship.svg">

Xem [hướng dẫn cài đặt & chạy project](/README.md) và  [Migrate & Seed Database](./database.md) 

#### Công việc chưa hoàn thành

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
