const Tour = require("../models/tourModel");

// exports.checkBody = (req, res, next) => {
//   console.log(`checkBody starts`);
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Missing name or price",
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  // console.log(req.requestTime);
  try {
    const tours = await Tour.find();

    res.status(200).json({
      // requestedAt: req.requestTime,

      status: "success",
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id})

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
  console.log(`id is ${req.params.id}`);
  //const id = req.params.id * 1;
  //const tour = tours.find((el) => el.id === id);
};

exports.createTour = async (req, res) => {
  //console.log(req.body);
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    stauts: "success",
    data: {
      tour: "<Updated tour here>",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    stauts: "success",
    data: null,
  });
};
