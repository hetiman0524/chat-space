# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false, unique: true|
|password|integer|null: false|

### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :chats

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :chats

## chatsテーブル

|Column|Type|Options|
|------|----|-------|
|text|string|
|image|string|
|created_at|integer|null: false|
|updated_at|integer|null: false|
|group_id|references|null: false,  foreign_key: true|
|user_id|references|null: false ,foreign_key: true|

### Association
- belongs_to :group 
- belongs_to :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|references|null: false,  foreign_key: true|
|user_id|references|null: false ,foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

