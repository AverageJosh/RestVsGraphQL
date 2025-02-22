﻿using Models;
using RestVsGraphQL.Data;

namespace RestVsGraphQL.GraphQL
{
    public class GraphQLQuery
    {
        private readonly PostDataService _postData;

        public GraphQLQuery(PostDataService postData)
        {
            _postData = postData;
        }

        [UseFiltering]
        [UseSorting]
        [GraphQLDescription("Get all posts")]
        public List<Post> GetPosts() => _postData.GetPosts();

        [UsePaging]
        [UseFiltering]
        [GraphQLDescription("Get paginated posts")]
        public IEnumerable<Post> GetPaginatedPosts => _postData.GetPosts();

        [GraphQLDescription("Get a single post by its id")]
        public Post? GetPost(int id)
        {
            return _postData.GetPosts().Find(p => p.Id == id);
        }
    }
}