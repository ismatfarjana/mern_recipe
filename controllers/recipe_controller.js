const RecipeModel = require("../models/Recipe.model");

const recipeForm = (req, res) => {
  res.render("recipe/addRecipe");
};

module.exports = {
  recipeForm
};
