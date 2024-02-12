const joinQuery = require('mongo-join-query');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Category = require('../models/categoryModel');
const Room = require('../models/roomModel');
const uploadToS3 = require('../utils/s3');

exports.getAllRooms = factory.getAll(Room);
//reviews 는 roomModel안에서 roomSchema.virtual('reviews' <-의것임
exports.getRoom = factory.getOne(Room, {
  path: 'reviews',
  // -room만 쓰면 안됨..
  select: 'review overall_rating user createdAt -room',
  populate: [
    // {
    //   path: 'room',
    //   model: 'Room',
    //   select: ''
    // },
    {
      path: 'user',
      model: 'User',
      select: 'name'
    }
  ],
  options: {
    limit: 2,
    sort: { createdAt: -1 } //-1도됨
    // skip: 0
  }
});
exports.createRoom = factory.createOne(Room);
exports.updateRoom = factory.updateOne(Room);
exports.deleteRoom = factory.deleteOne(Room);

AWS.config.update({
  apiVersion: '2010-12-01',
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-east-1'
});
const s3 = new AWS.S3();
const multerStorage = multerS3({
  s3: s3,
  bucket: 'kwhouse',
  key: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const ext = file.mimetype.split('/')[1];
    cb(null, `rooms/${name}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadTourImages = upload.array('images', 10);
exports.insertTourImagesLinks = (req, res, next) => {
  if (!req.files) return next();
  const images = [];
  req.files.forEach(file => {
    images.push(file.location);
  });
  req.body.images = images;
  next();
};

exports.updatePictureToRoom = catchAsync(async (req, res, next) => {
  const doc = await Room.findByIdAndUpdate(
    req.params.id,
    { pictures: req.body.images },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    results: doc,
    data: {
      data: doc
    }
  });
});

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
