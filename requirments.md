## --Төслийн нэр--
IndraCyber Institute Official Website

## --Төслийн зорилго--
IndraCyber Institute-ийн сургалтын үйл ажиллагаа, мэргэжлийн хөтөлбөрүүд, ангиудын мэдээлэл, элсэлтийн бүртгэл болон суралцагчдад зориулсан мэдээллийг цахимаар хүргэх веб систем боловсруулах.

## 1.--Сургуулийн мэдээлэл
IndraCyber Institute нь дараах мэргэжлүүдээр сургалт явуулна.
## 1.💻 Software Engineering
3 анги
Веб хөгжүүлэлт
Mobile хөгжүүлэлт
Database & Backend

## 2.🎨 Graphic Design
1 анги
Photoshop
Illustrator
UI/UX Design

## 3.📈 Digital Marketing
3 анги
Social Media Marketing
SEO
Content Marketing

## 2. Хэрэглэгчийн төрөл
--Visitor (Зочин)
Вэбсайт үзэх
Мэргэжлийн мэдээлэл харах
Багш нарын мэдээлэл харах
Элсэлтийн мэдээлэл харах
Холбоо барих мэдээлэл харах
Онлайн бүртгэл бөглөх\

--Student (Суралцагч)
Нэвтрэх
Өөрийн мэдээлэл харах
Хуваарь харах
Зар мэдээ харах

--Admin
Сургуулийн мэдээлэл удирдах
Хөтөлбөр нэмэх
Багш нэмэх
Мэдээ нийтлэх
Элсэгчдийн бүртгэл харах
Хэрэглэгч удирдах



## 3. Functional Requirements
Home Page
ID	Requirement
FR-01	Нүүр хуудас байх
FR-02	Сургуулийн танилцуулга харагдах
FR-03	Сургуулийн статистик харуулах
FR-04	Онцлох мэдээ харуулах


## Programs Module
ID	Requirement
FR-05	Software Engineering мэдээлэл харах
FR-06	Graphic Design мэдээлэл харах
FR-07	Digital Marketing мэдээлэл харах
FR-08	Ангиудын мэдээлэл харах
FR-09	Сургалтын төлөвлөгөө харах


## Admission Module
ID	Requirement
FR-10	Элсэлтийн мэдээлэл харах
FR-11	Онлайн бүртгэл хийх
FR-12	Бүртгэлийн мэдээлэл хадгалах
FR-13	Админ бүртгэлүүдийг харах
FR-14	Элсэгчийн төлөв шинэчлэх

## News Module
ID	Requirement
FR-15	Мэдээ нийтлэх
FR-16	Мэдээ засах
FR-17	Мэдээ устгах
FR-18	Мэдээ унших

## Teacher Module
ID	Requirement
FR-19	Багш нарын мэдээлэл харах
FR-20	Багш нэмэх
FR-21	Багшийн мэдээлэл засах
FR-22	Багш устгах


## Student Portal
ID	Requirement
FR-23	Student Login
FR-24	Хуваарь харах
FR-25	Зар мэдээлэл харах
FR-26	Профайл харах


## Contact Module
ID	Requirement
FR-27	Холбоо барих форм
FR-28	Google Map харуулах
FR-29	Сошиал хаяг харуулах


## 4. Non-Functional Requirements
--Security
JWT Authentication
Password Encryption
Role Based Authorization

--Performance
Хуудас 3 секундээс бага хугацаанд ачаалагдах
Availability
24/7 ажиллагаатай байх

--Responsive Design
Desktop
Mobile

--Browser Support
Chrome
Safari

## 5. Database Tables
--users
id
fullname
email
password
role

--programs
id
program_name
description
duration

--classes
id
class_name
program_id

--teachers
id
fullname
profession
image

--admissions
id
fullname
email
phone
selected_program
status

--news
id
title
content
image
created_at

--contacts
id
fullname
email
message