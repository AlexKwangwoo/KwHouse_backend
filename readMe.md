1. Room

2) Category

3) Amenity

4) Add On Service

5) Filter

6) const doc = await Room.find({}).populate({
   path: 'category',
   name: { \$eq: 'Design' }
   }); 이거 무조건 null나옴 저렇게 자식속성 못타고감!!
   https://mongoosejs.com/docs/populate.html#query-conditions 참고!!

https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design

7.

Things to do

- (Done) User -> rooom에서 parents referencing /만약 A유저가 가지고있는 room을 보고싶다면 room에서 필터를 해서가져오면됨!
- (Done) Amenity -> room에서 children referencing
- (Done) Add On Service -> both referencing
- (Done) category -> both
- (Done) review 방안에 6개만 보이게 해놨음 하지만 자세히 클릭시 => 페이지네이션 => 방에따라
- (Done) user picture option

- settings option

Remember things
