using Models;
using RestVsGraphQL.Data;

public class GraphQLQuery
{
	private readonly PostData _postData;

	public GraphQLQuery(PostData postData) {
		_postData = postData;
	}

	[GraphQLDescription("Get all posts")]
	public List<Post> GetPosts() => _postData.GetPosts();

	[GraphQLDescription("Get a single post by its id")]
	public Post? GetPost(int id) 
	{
		return _postData.GetPosts().Find(p => p.Id == id);
	}
}