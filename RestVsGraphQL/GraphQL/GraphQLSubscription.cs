using Models;

namespace RestVsGraphQL.GraphQL
{
	public class GraphQLSubscription
	{
		[Subscribe]
		public Post OnAdd([EventMessage] Post post)
		{
			return post;
		}

        [Subscribe]
        public string OnMessageReceived([EventMessage] string message) => message;
    }
}
