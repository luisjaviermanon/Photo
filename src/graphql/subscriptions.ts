/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateLike = /* GraphQL */ `subscription OnCreateLike($filter: ModelSubscriptionLikeFilterInput) {
  onCreateLike(filter: $filter) {
    id
    userID
    postID
    User {
      id
      name
      image
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      email
      createdAt
      updatedAt
      __typename
    }
    Post {
      id
      description
      video
      image
      images
      nofComments
      nofLikes
      userID
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLikeSubscriptionVariables,
  APITypes.OnCreateLikeSubscription
>;
export const onUpdateLike = /* GraphQL */ `subscription OnUpdateLike($filter: ModelSubscriptionLikeFilterInput) {
  onUpdateLike(filter: $filter) {
    id
    userID
    postID
    User {
      id
      name
      image
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      email
      createdAt
      updatedAt
      __typename
    }
    Post {
      id
      description
      video
      image
      images
      nofComments
      nofLikes
      userID
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLikeSubscriptionVariables,
  APITypes.OnUpdateLikeSubscription
>;
export const onDeleteLike = /* GraphQL */ `subscription OnDeleteLike($filter: ModelSubscriptionLikeFilterInput) {
  onDeleteLike(filter: $filter) {
    id
    userID
    postID
    User {
      id
      name
      image
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      email
      createdAt
      updatedAt
      __typename
    }
    Post {
      id
      description
      video
      image
      images
      nofComments
      nofLikes
      userID
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLikeSubscriptionVariables,
  APITypes.OnDeleteLikeSubscription
>;
export const onCreateComment = /* GraphQL */ `subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
  onCreateComment(filter: $filter) {
    id
    comment
    userID
    postID
    User {
      id
      name
      image
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      email
      createdAt
      updatedAt
      __typename
    }
    Post {
      id
      description
      video
      image
      images
      nofComments
      nofLikes
      userID
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCommentSubscriptionVariables,
  APITypes.OnCreateCommentSubscription
>;
export const onUpdateComment = /* GraphQL */ `subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
  onUpdateComment(filter: $filter) {
    id
    comment
    userID
    postID
    User {
      id
      name
      image
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      email
      createdAt
      updatedAt
      __typename
    }
    Post {
      id
      description
      video
      image
      images
      nofComments
      nofLikes
      userID
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCommentSubscriptionVariables,
  APITypes.OnUpdateCommentSubscription
>;
export const onDeleteComment = /* GraphQL */ `subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
  onDeleteComment(filter: $filter) {
    id
    comment
    userID
    postID
    User {
      id
      name
      image
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      email
      createdAt
      updatedAt
      __typename
    }
    Post {
      id
      description
      video
      image
      images
      nofComments
      nofLikes
      userID
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCommentSubscriptionVariables,
  APITypes.OnDeleteCommentSubscription
>;
export const onCreatePost = /* GraphQL */ `subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
  onCreatePost(filter: $filter) {
    id
    description
    video
    image
    images
    nofComments
    nofLikes
    userID
    User {
      id
      name
      image
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      email
      createdAt
      updatedAt
      __typename
    }
    Comments {
      nextToken
      __typename
    }
    Likes {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePostSubscriptionVariables,
  APITypes.OnCreatePostSubscription
>;
export const onUpdatePost = /* GraphQL */ `subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
  onUpdatePost(filter: $filter) {
    id
    description
    video
    image
    images
    nofComments
    nofLikes
    userID
    User {
      id
      name
      image
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      email
      createdAt
      updatedAt
      __typename
    }
    Comments {
      nextToken
      __typename
    }
    Likes {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePostSubscriptionVariables,
  APITypes.OnUpdatePostSubscription
>;
export const onDeletePost = /* GraphQL */ `subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
  onDeletePost(filter: $filter) {
    id
    description
    video
    image
    images
    nofComments
    nofLikes
    userID
    User {
      id
      name
      image
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      email
      createdAt
      updatedAt
      __typename
    }
    Comments {
      nextToken
      __typename
    }
    Likes {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePostSubscriptionVariables,
  APITypes.OnDeletePostSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
    id
    name
    image
    bio
    username
    website
    nofPosts
    nofFollowers
    nofFollowings
    email
    Posts {
      nextToken
      __typename
    }
    Comments {
      nextToken
      __typename
    }
    Likes {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
    id
    name
    image
    bio
    username
    website
    nofPosts
    nofFollowers
    nofFollowings
    email
    Posts {
      nextToken
      __typename
    }
    Comments {
      nextToken
      __typename
    }
    Likes {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
    id
    name
    image
    bio
    username
    website
    nofPosts
    nofFollowers
    nofFollowings
    email
    Posts {
      nextToken
      __typename
    }
    Comments {
      nextToken
      __typename
    }
    Likes {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
