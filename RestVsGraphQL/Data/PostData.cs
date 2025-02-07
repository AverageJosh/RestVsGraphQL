using Models;
using System.Collections.Concurrent;

namespace RestVsGraphQL.Data
{
	public class PostDataService
	{
		private static readonly ConcurrentBag<Post> _posts = new();
		private static int _nextId = 3;
		private static readonly object _lock = new();

		public PostDataService() { }

		public List<Post> Load()
		{
			lock (_lock) {
				_posts.Add(new() { Id = 1, Title = "First GraphQL Post", Author = new User { Id = 1, Name = "John" } });
				_posts.Add(new() { Id = 2, Title = "Second GraphQL Post", Author = new User { Id = 2, Name = "Jane" } });
			}

			return [.._posts];
		}

		public List<Post> GetPosts()
		{
			lock (_lock) 
			{
				return [.._posts];
			}
		}

		public bool AddPost(Post post)
		{
			post.Id = _nextId++;
			lock (_lock)
			{
				_posts.Add(post);
			}

			return true;
		}
	}
}
