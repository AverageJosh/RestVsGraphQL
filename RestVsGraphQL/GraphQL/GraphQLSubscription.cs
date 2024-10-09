using Models;

namespace RestVsGraphQL.GraphQL
{
	public class GraphQLSubscription
	{
		[Subscribe]
		[Topic(nameof(GraphQLMutation.AddPost))]
		public Post OnAdd([EventMessage] Post post)
		{
			return post;
		}
	}
}
