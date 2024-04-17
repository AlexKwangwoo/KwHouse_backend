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

9) await 하고 findByInAndUpdate 써야함

10) ---

**\*\*\*\***\*\***\*\*\*\*** aggregate \***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***\*\*\*\*\***

---

- match 는 필터라 보면된다. 다큐먼트의 수를 제한 시킬수있다
- group 은 내가알고있는데로 하나의 기준으로 그룹을 만든다.. 리뷰를 예로들면 룸 기준으로 그룹별로 만든다
- unwind 는 다큐먼트내에 예를들어
  {
  name:a
  category [ a,b,c]
  } 라 할때 $unwind:$category 를쓰면
  {
  name:a
  category: a
  }
  {
  name:a
  category: b
  }
  {
  name:a
  category: c
  } 즉 3개로 나뉜다!
- project 는 다큐먼트안의 어떤 필드만 다음 파이프 라인에 전달할까 결정하는 놈임
  { \$project: { amenities: 1, maximum_guests: 1 } } 하면,

  <!-- statsUserstatsUser [
    {
      _id: 65c42190e9828abb3e812e8e,
      amenities: [ 65c2f8214bd4e09cbc05c335 ],
      maximum_guests: 4
    },
    {
      _id: 65c4344e327c1fe2a4045c73,
      amenities: [ 65c2f675385e9a992e16b81f, 65c2f8214bd4e09cbc05c335 ],
      maximum_guests: 4
    }
  ] -->

  즉 1은 결과를 전달해주세요 라는 뜻이다.

- 연산자
  <!-- const checkExist = await ReviewRoom.find({
            $and: [
               {
               user: req.body.user
               },
               {
               room: req.body.room
               }
            ]
          }); -->

* (Done) User -> rooom에서 parents referencing /만약 A유저가 가지고있는 room을 보고싶다면 room에서 필터를 해서가져오면됨!
* (Done) Amenity -> room에서 children referencing
* (Done) Add On Service -> both referencing
* (Done) category -> both
* (Done) review 방안에 6개만 보이게 해놨음 하지만 자세히 클릭시 => 페이지네이션 => 방에따라
* (Done) review 방한개당 유저 하나만 가능!
* (Done) user picture option
* (Done) settings option
* (Done) wishlist
* user notification
* promotion
* booking -> 예약안되게 막아야하는 로직 세워야함! -> Room booking check!! ->
* booking history

Remember things

install / deploy
https://www.youtube.com/watch?v=T-Pum2TraX4&t=713s 인스탄스 만드는거 까지만보고 우분투 선택!
https://www.youtube.com/watch?v=i5oU38ejlfI 여기로 와서 따라하기
https://github.com/yeshwanthlm/nodejs-on-ec2

1. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
2. . ~/.nvm/nvm.sh

Use nvm to install the latest version of Node.js by typing the following at the command line.

3. nvm install node

git install

4. sudo apt-get update -y
5. sudo apt-get install git -y
6. git clone https://github.com/AlexKwangwoo/KwHouse_backend.git
7. ls -ltr => 하면 우리가 클론한게 보일것임
8. 그러면 cd KwHouse_backend 로 이동후
9. npm install
10. npm start
11. env setting
    Edit ~/.bashrc file of User which will run the program

sudo nano ~/.bashrc

Add following line at the end, use any variable_name. Assuming unique and unused

마지막 줄에 export API_KEY=btgj32fkf 이런식으로 하고 엔터치면 저장됨

Save File and

source ~/.bashrc

    https://stackoverflow.com/questions/47321085/how-to-set-up-node-js-process-env-variables-for-production-with-an-amazon-ec2-in

12. 마지막으로 인스턴스 클릭후 security group에서 inbound rules 들어가서 edit 누른뒤
13. add rule 해서 type custom tcp -> port range 4000 -> source my ip 하고 업데이트 해주면됨
14. 주소칠때 http: 로 해야함 s 있으면 안됨
