const joinQuery = require('mongo-join-query');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Category = require('../models/categoryModel');
const Room = require('../models/roomModel');

exports.getAllRooms = factory.getAll(Room);
exports.getRoom = factory.getOne(Room);
exports.createRoom = factory.createOne(Room);
exports.updateRoom = factory.updateOne(Room);
exports.deleteRoom = factory.deleteOne(Room);

// aggregation 참고 한번 api실행해보면 느낌옴.. 난이도에 따라 정렬될것임
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/#date-expression-operators
exports.getRoomByCate = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ name: req.query.category });
  const doc = await Room.find({ category: category._id });

  // console.log('req.query here', req.query);

  // const doc = await Room.aggregate([
  //   { $match: { name: 'Design' } },
  //   {
  //     $lookup: {
  //       from: 'room',
  //       let: { categoryId: '$_id' },
  //       pipeline: [
  //         { $match: { $expr: { $eq: ['$category', '$$categoryId'] } } }
  //       ],
  //       as: 'room'
  //     }
  //   }
  // ]);

  // const doc = await Room.aggregate([
  //   { $match: { category: '65c41a799f7214affef63968' } }
  // ]);

  // const doc = await Room.aggregate([
  //   {
  //     $lookup: {
  //       from: 'room',
  //       localField: '_id',
  //       foreignField: 'category',
  //       as: 'results'
  //     }
  //   },
  //   { $match: { $expr: { $eq: ['$results', ['category', '_id']] } } }
  //   // {"$unset": ["results"]}])

  //   // { $match: { 'category.name': 'Design' } }
  // ]);

  // const doc = await Room.aggregate([
  //   {
  //     $lookup: {
  //       from: 'room',
  //       localField: '_id',
  //       foreignField: 'category',
  //       as: 'room'
  //     }
  //   }
  // ]);

  // const doc = await Room.find({
  //   category: { $in: '65c41a799f7214affef63968' }
  // }).populate('category');

  // const doc = await Room.aggregate([
  //   {
  //     $lookup: {
  //       from: 'category',
  //       localField: 'category',
  //       foreignField: '_id',
  //       as: 'category'
  //     }
  //   },
  //   {
  //     $project: {
  //       Category: { name: 'Design' }
  //     }
  //   }

  //   // {
  //   //   $match: {
  //   //     'resultingArray.name': 'Design'
  //   //   }
  //   // }
  // ]);

  // const doc = await Room.aggregate([
  //   // { $unwind: '$category' },
  //   {
  //     $lookup: {
  //       from: 'category',
  //       localField: 'category',
  //       foreignField: '_id',
  //       as: 'categoryaaa'
  //     }
  //   },
  //   {
  //     $match: {
  //       category: '65c41a799f7214affef63968'
  //     }
  //   }
  // ]);

  // await joinQuery(
  //   Room,
  //   {
  //     find: { category: { name: { $eq: 'Design' } } },
  //     populate: ['category']
  //   },
  //   (err, response) =>
  //     err
  //       ? console.log('Error:', err)
  //       : res.status(200).json({
  //           status: 'success',
  //           data: {
  //             data: response.results
  //           }
  //         })
  // );

  // const doc = await Room.aggregate([
  //   {
  //     //similar filter 4.5이상 만 고른다
  //     $match: { category: { _id: { $eq: '65c41a799f7214affef63968' } } }
  //   }
  // ]);

  // const doc = await Room.findOne({'author.category': 'Design'}).populate({
  //   path: 'category',
  //   match: { name: 'Lakefront' },
  //   select: 'name -_id'
  // });

  // const doc2 = await Room.find({
  //   category: { name: { $eq: 'Design' } }
  // });

  // const doc = await Room.find({ 'category.name': 'Design' });
  // .populate({
  //   path: 'category',
  //   match: { name: { $eq: 'Design' } },
  //   // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
  //   select: 'name -_id'
  // })
  // .exec();

  // console.log('docdocdoc', doc);

  // const doc = await Room.aggregate([
  //   {
  //     $unwind: '$category'
  //   },
  //   {
  //     $lookup: {
  //       from: 'category',
  //       localField: 'category',
  //       foreignField: '_id',
  //       as: 'categoryaaa'
  //     }
  //   },
  //   {
  //     $match: {
  //       'chapter.name': 'Design'
  //     }
  //   },
  //   {
  //     $group: {
  //       _id: '$_id',
  //       title: { $first: '$title' }
  //     }
  //   }
  // ]);

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc
    }
  });
});
