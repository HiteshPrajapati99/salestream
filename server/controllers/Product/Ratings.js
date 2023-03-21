const asynchandler = require("express-async-handler");
const Products = require("../../models/Product");

module.exports = ratings = asynchandler(async (req, res) => {
  const { id } = req.decoded;

  const { star, productID } = req.body;
  try {
    const product = await Products.findById(productID);

    const allredyrate = product.ratings.find(
      (userId) => userId.postedby.toString() === id
    );

    if (allredyrate) {
      const updateRating = await Products.updateOne(
        {
          ratings: { $elemMatch: allredyrate },
        },
        {
          $set: { "ratings.$.star": star },
        }
      );
    } else {
      const reteproduct = await Products.findByIdAndUpdate(productID, {
        $push: {
          ratings: {
            star: star,
            postedby: id,
          },
        },
      });
    }

    const getallratings = await Products.findById(productID);
    const totalRating = getallratings.ratings.length;

    const getrate = getallratings.ratings;

    const sum = getrate
      .map((item) => {
        return item.star;
      })
      .reduce((total, star) => total + star, 0);

    const getTotalratings = Math.round(sum / totalRating);

    const UpdatedProd = await Products.findByIdAndUpdate(
      productID,
      {
        totalrating: getTotalratings,
      },
      { new: true }
    );

    res.json(UpdatedProd);
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
});
