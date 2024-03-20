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

7. pre 쓸때
   const Booking = mongoose.model('Booking', bookingSchema);
   module.exports = Booking; 위에 써야함!! 안그러면 작동안함

Things t

8. unwind 입력 문서에서 배열 필드를 분해하여 각 요소에 대한 문서를 출력합니다. 각 출력 문서는 배열 필드의 값이 요소로 대체된 입력 문서입니다.

- (Done) User -> rooom에서 parents referencing /만약 A유저가 가지고있는 room을 보고싶다면 room에서 필터를 해서가져오면됨!
- (Done) Amenity -> room에서 children referencing
- (Done) Add On Service -> both referencing
- (Done) category -> both
- (Done) review 방안에 6개만 보이게 해놨음 하지만 자세히 클릭시 => 페이지네이션 => 방에따라
- (Done) review 방한개당 유저 하나만 가능!
- (Done) user picture option
- (Done) settings option
- (Done) wishlist
- user notification
- promotion
- booking -> 예약안되게 막아야하는 로직 세워야함! -> Room booking check!! ->
- booking history

Remember things
