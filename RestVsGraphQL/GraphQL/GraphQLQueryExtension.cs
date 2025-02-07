using Models;
using RestVsGraphQL.Data;

namespace RestVsGraphQL.GraphQL
{
	[ExtendObjectType<GraphQLQuery>]
    public class GraphQLQueryExtension
    {
        private readonly PostDataService _postData;

        public GraphQLQueryExtension(PostDataService postData)
        {
            _postData = postData;
        }

        [GraphQLDescription("Get the first post")]
        public Post? GetFirstPost() => _postData.GetPosts()?.FirstOrDefault();
    }
}