const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    recipeName: { type: String, required: true },
    recipeWriter: { type: String, required: true },
    writerId: { type: String, required: true },
    ingredients: { type: String, required: true },
    steps: { type: String, required: true },
    date: { type: Date, required: true },
    comments: [
      {
        comment: String,
        name: String
      }
    ]
  },
  {
    timestamps: true
  }
);

const Recipe = mongoose.model("recipe", recipeSchema);
module.exports = Recipe;
