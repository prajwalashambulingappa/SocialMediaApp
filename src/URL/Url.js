const baseUrl = "http://localhost:9001";
// const baseUrl ="https://enquero-socialmediaapp-backend.herokuapp.com";
export const signInLink = baseUrl + "/user/login";
export const signUpLink = baseUrl + "/user/signup";
export const fetchHomePagePostlink = baseUrl +  "/post/home";
export const uploadPostLink = baseUrl + "";

export const allCommentsLink = baseUrl + "/comment/all-comments";
export const allLikesLink = baseUrl + "/likes/all-likes";
export const checkPostIsLikedLink =  baseUrl + "/likes/check/is-liked"
export const fetchHashtagPostsLink = baseUrl + "/post/hashtag";

export const addLikeToPostLink = baseUrl + "/likes/add";
export const deleteLikePostLink = baseUrl +"/likes/delete";

export const addnewCommentLink = baseUrl+"/comment/add";
export const uploadNewPostLink = baseUrl + "/post/add";