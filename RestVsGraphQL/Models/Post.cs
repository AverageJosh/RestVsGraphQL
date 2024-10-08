namespace Models
{
	public class Post
	{
		public int Id { get; set; }
		public required string Title { get; set; }
		public required User Author { get; set; }
	}

	public class User
	{
		public int Id { get; set; }
		public required string Name { get; set; }
	}
}