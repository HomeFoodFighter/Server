const recipeProvider = require("../../app/recipe/recipeProvider");
const recipeService = require("../../app/recipe/recipeService");
const baseResponse = require("../../../config/baseResponse");
const { response, errResponse } = require("../../../config/response");
const jwtMiddleware = require('../../../config/jwtMiddleware');


/**
 * API No. 15
 * API Name : 레시피의 리뷰(후기) 등록
 * [POST] /recipe/:recipe_id/review/:userid
 */
exports.PostRegisterReview = async function (req, res) {
    const recipe_id = req.params.recipe_id;
    const userid = req.verifiedToken.userId;
    const star = req.body.star;
    const content = req.body.content;

    console.log(recipe_id,userid,star);

    const Info = [recipe_id, userid, star, content];

    // 빈 값 체크
    if(!content){
        return res.send(errResponse(baseResponse.CONTENT_EMPTY));
    }

    //최소 별점 값 체크
    if(star<0.5){
        return res.send(errResponse(baseResponse.STAR_CHECK1));
    }
    else{ // 0.5 단위 체크
        if(star % 0.5 != 0){
            return res.send(errResponse(baseResponse.STAR_CHECK2));
        }
    }
    const ReviewInfoResult = await recipeService.registerReview(Info);
    return res.send(response(baseResponse.SUCCESS, ReviewInfoResult));

};

/**
 * API No. 19
 * API Name : 인기 레시피 조회
 * [GET] /recipe/highest-star?limit=
 */
exports.GetRecipeHot = async function(req,res){
    const limit = req.query.limit;

    if(!limit){
        const highestStar = await recipeProvider.getRecipeHot();
        return res.send(response(baseResponse.SUCCESS, highestStar));
    } else{
        const highestStar = await recipeProvider.getRecipeHotLimit(limit);
        return res.send(response(baseResponse.SUCCESS ,highestStar));
    }
};

/**
 * API No. 20
 * API Name : 레시피 상세 페이지 조회
 * [GET] /recipe/detail?recipe_id=
 */
exports.GetDetail= async function (req, res){
    const recipe_id = req.query.recipe_id;
    console.log(recipe_id);

    
    const recipeResult = await recipeProvider.getDetail(recipe_id);
    return res.send(response(baseResponse.SUCCESS, recipeResult));
};

/**
 * API No. 25
 * API Name : 가능한 레시피 조회 API
 * [GET] /refrigerator/possible
 * query string을 이용해 recipe/possible?ids = 22,23,24 이런식으로 들어올경우 ,로 구분하여 배열생성
 */
exports.possibleRecipe = async function (req, res) {
    const ids = req.query.ids.split(',');
    if(ids.length > 0){
        const recipeResult = await recipeProvider.getpossible(ids);
        return res.send(response(baseResponse.SUCCESS, recipeResult));
    }

    else{
        return res.send(baseResponse.INGRE_CHECK);
    }
};


/**
 * API No. 34
 * API Name : 레시피 전체조회 및 타입별 레시피 조회
 * [GET] /recipe?type=
 */
exports.GetallRecipe = async function (req, res) {
    const RecipeType = req.query.type;
    console.log(RecipeType);
    if(!RecipeType){
        const allRecipeResult = await recipeProvider.allRecipe();
        return res.send(allRecipeResult);
    }
    else if(RecipeType < 0 || RecipeType > 7){
        return res.send(baseResponse.TYPE_CHECK);
    }
    else{
        const RecipeTypeResult = await recipeProvider.TypeRecipe(RecipeType);
        return res.send(RecipeTypeResult);
    }

}


/**
 * API No. 35
 * API Name : 음식 이름으로 레시피조회
 * [GET] /recipe/name?recipe_name=
 */

exports.GetFoodNameRecipe = async function (req, res) {
    const recipe_name = req.query.recipe_name;

    const FoodNameRecipeResult = await recipeProvider.FoodNameRecipe(recipe_name);
    return res.send(FoodNameRecipeResult);
}

