const router = require("express").Router();
let Recipe = require("../models/Recipe.model");

const { recipeForm } = require("../controllers/recipe_controller");

//show all recipes
router.get("/", (req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json("ERROR: " + err));
});

//show one recipe
router.get("/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json("ERROR: " + err));
});

//add one recipe
router.post("/", (req, res) => {
  const recipeName = req.body.recipeName;
  const recipeWriter = req.body.recipeWriter;
  const writerId = req.body.writerId;
  const ingredients = req.body.ingredients;
  const steps = req.body.steps;
  const date = Date.parse(req.body.date);
  const newRecipe = new recipe({
    recipeName,
    recipeWriter,
    writerId,
    ingredients,
    steps,
    date
  });
  newRecipe
    .save()
    .then(newRecipe => res.render("recipe/addRecipe"))
    .catch();
});

// update one recipe
router.put("/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id)
    .then(recipe => {
      //i will allow to chnage only the titile and content
      recipe.recipeName = req.body.recipeName;
      recipe.recipeWriter = req.body.recipeWriter;
      recipe.writerId = req.body.writerId;
      recipe.ingredients = req.body.ingredients;
      recipe.steps = req.body.steps;

      recipe
        .save()
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json("Error:" + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});
//delete one recipe
router.delete("/:id", (req, res) => {
  recipe
    .findByIdAndDelete(req.params.id)
    .then(res.send({ message: "Recipe successfully deleted!" }))
    .catch(err => res.status(400).json("Error: " + err));
});

//POST a comment on a recipe
router.post("/:id/comments", (req, res) => {
  //get the recipe of for :id
  Recipe.findById(req.params.id)
    .then(recipe => {
      //create a comments array with new comment
      const comments = recipe.comments.concat({
        comment: req.body.comment,
        name: req.body.name
      });

      //update the recipe with comments array
      recipe.comments = comments;

      //save the blog with updated comments
      recipe
        .save()
        .then(recipe => res.json(recipe))
        .catch(err => {
          console.log(err);
          return res.status(400).json("Error: " + err);
        });
    })
    .catch(err => res.status(400).json("error" + err));
});

router.get("/recipes/form", recipeForm);
// router.post("/recipes", );
//after all the routes export the module
module.exports = router;
