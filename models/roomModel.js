const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Provide name!'],
      maxlength: [40, 'Name must have less or equal then 40 characters']
    },

    country: {
      type: String,
      maxlength: [30, 'Name must have less or equal then 20 characters']
    },

    city: {
      type: String,
      maxlength: [30, 'Name must have less or equal then 20 characters']
    },

    price: { type: Number },

    pictures: [String],

    cleaning_fee: { type: Number, min: 0 },

    number_of_room: { type: Number, min: 0 },

    number_of_toilet: { type: Number, min: 0 },

    number_of_bed: { type: Number, min: 0 },

    number_of_bedroom: { type: Number, min: 0 },

    maximum_guests: { type: Number, min: 0 },

    all_overall_rating_quantity: { type: Number, min: 0 },

    all_overall_rating_average: { type: Number, min: 0, max: 5 },

    description: {
      type: String,
      maxlength: [
        200,
        'Description must have less or equal then 100 characters'
      ]
    },

    address: {
      type: String,
      maxlength: [
        200,
        'Description must have less or equal then 100 characters'
      ]
    },

    pet_friendly: { type: Boolean },

    house_type: { type: String },

    things_to_know: {
      type: String,
      maxlength: [
        500,
        'Description must have less or equal then 100 characters'
      ]
    },

    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User', //User 여기껀 import필요없다 이렇게는 referencing
      required: [true, 'Owner must belong to a room']
    },

    amenities: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Amenity'
      }
    ],

    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category', //User 여기껀 import필요없다 이렇게는 referencing
      required: [true, 'Category must belong to a room']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// 이건 자식이 포린키를 가지고있고 부모가 아무정보도 없을때.. 리뷰를 생각해보면 1000만개가 부모가 저장하기힘듬
// 그래서 리뷰 자체에 부모키를 넣고 이렇게 불러올수있는것임!
roomSchema.virtual('reviews', {
  ref: 'ReviewRoom', //본채의 아이디를
  foreignField: 'room', // 넣어줄곳
  localField: '_id'
});

roomSchema.pre(/^find/, function(next) {
  // user 만 쓰면 전체다 나오는거 / path 주면 select 까지 선택가능! boooking 참고!
  this.populate({ path: 'category', select: 'name' })
    .populate({ path: 'amenities', select: 'name' })
    .populate({
      // 이렇게하면 투어에서 리뷰를 볼떄 또 투어를 넣어줄것임... 그래서 밑에서 투어없이 해봄
      //durationWeeks 도 보이는데 이는 가상 결과라 나옴 db에서오는게아님
      path: 'owner',
      select: 'name -wishlist profile_img' //-를붙이고 guides 필드에 __v passwordChangedAt을 안보이게 한다
    }); //영상에서는 populate tour는 안썼음.. 그래서 바로 tour에 id가 들어가서 밑에 post에서 tour <-자리에 id가 있는것임

  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   // 이렇게하면 투어에서 리뷰를 볼떄 또 투어를 넣어줄것임... 그래서 밑에서 투어없이 해봄
  //   //durationWeeks 도 보이는데 이는 가상 결과라 나옴 db에서오는게아님
  //   path: 'user',
  //   select: '-__v -passwordChangedAt' //-를붙이고 guides 필드에 __v passwordChangedAt을 안보이게 한다
  // });

  // this.populate({
  //   // 이렇게하면 투어에서 리뷰를 볼떄 또 투어를 넣어줄것임... 그래서 밑에서 투어없이 해봄
  //   //durationWeeks 도 보이는데 이는 가상 결과라 나옴 db에서오는게아님
  //   path: 'user',
  //   select: '-__v -passwordChangedAt' //-를붙이고 guides 필드에 __v passwordChangedAt을 안보이게 한다
  // });
  next();
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
