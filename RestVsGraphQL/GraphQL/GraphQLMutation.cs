using HotChocolate.Subscriptions;
using Models;
using RestVsGraphQL.Data;

namespace RestVsGraphQL.GraphQL
{
    public class GraphQLMutation
    {
        public async Task<Post> AddPost([Service] PostDataService postData,
            [Service] ITopicEventSender eventSender,
            string title,
            string authorName)
        {
            var newPost = new Post()
            {
                Title = title,
                Author = new User() { Name = authorName }

            };

            postData.AddPost(newPost);
			
            await eventSender.SendAsync(nameof(GraphQLSubscription.OnMessageReceived), $"{newPost.Title} has been added!");

            await eventSender.SendAsync(nameof(GraphQLSubscription.OnAdd), newPost);

            return newPost;
        }
    }
}
