using Models;

namespace RestVsGraphQL.Data
{
	public class PostData
	{
		public PostData() { }

		public List<Post> GetPosts() =>
		[
			new() { Id = 1, Title = "First GraphQL Post", Author = new User { Id = 1, Name = "John" } },
			new() { Id = 2, Title = "Second GraphQL Post", Author = new User { Id = 2, Name = "Jane" } }
		];
	}
}
