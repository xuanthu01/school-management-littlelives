## Tổng quan

### Công nghệ sử dụng

API này được viết bằng NestJS (sử dụng Typescript), với TypeORM (Postgresql) làm database.
Dùng OpenAPI Swagger để quản lý các API, JSON Web Token để chứng thực người dùng.
Mô hình quan hệ giữa các bảng như hình sau:
![Database relationship](./relationship.svg)
<img src="./relationship.svg">

Riêng bảng School được thiết kế như sau:
![School relationship](./school-relationship.svg)
<img src="./school-relationship.svg">

Xem [hướng dẫn cài đặt & chạy project](/README.md) và  [Migrate & Seed Database](./database.md) 

### Tiến độ 

- [x] School Teacher can only export list of activities for the class they've been assigned
- [x] School Owner can export list of activities for every class in their school with:
  - [x] paid plan 
  - [x] free plan
- [x] HQ role can export list of activities for every school they owned with: 
  - [x] paid plan 
  - [ ] free plan
- [ ] Paid plan 1 sheet (CSV) for each class (school_owner role)/school (HQ role)
- [x] Authentication/Authorization(JWT)
- [x] Seeding data with Faker
