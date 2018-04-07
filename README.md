# messagesテーブル
Column|Type|Options|
|------|----|-------|
|body|string|
|image|string|
|user_id|integer|null: false, foreign_key: true, index: ture|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user

=======================
# usersテーブル
Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|name|string|null: false, index: ture|

### Association
- has_many :users_groups
- has_many :messeges
- has_many :groups, through: :users_groups


=======================
# groupsテーブル
Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users_groups
<!-- - has_many :messeges -->
- has_many :users, through: :users_groups

=======================
# users_groupsテーブル
Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
