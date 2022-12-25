import _ from "lodash"
import Authors from "./authors.json" assert { type: "json" }
import Posts from "./posts.json" assert { type: "json" }

import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} from "graphql"

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represent an author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    twitterHandle: { type: GraphQLString },
  }),
})

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This represent a Post",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: function (post) {
        return _.find(Authors, (a) => a.id == post.author_id)
      },
    },
  }),
})

const BlogQueryRootType = new GraphQLObjectType({
  name: "BlogAppSchema",
  description: "Blog Application Schema Query Root",
  fields: () => ({
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of all Authors",
      resolve: function () {
        return Authors
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      description: "List of all Posts",
      resolve: function () {
        return Posts
      },
    },
  }),
})

// const mutationType = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     addAuthor: {
//       type: AuthorType,
//       args: {
//         input: { name: GraphQLString },
//       },
//       resolve: function (source, args) {
//         const authorId = Authors.length
//         const author = {
//           id: authorId,
//           name: args.input.name,
//           twitterHandle: "@alonso",
//         }
//         Authors.push(author)
//         return _.find(Authors, { id: authorId })
//       },
//     },
//   },
// })

const BlogAppSchema = new GraphQLSchema({
  query: BlogQueryRootType,
//   mutation: mutationType,
})

export default BlogAppSchema
