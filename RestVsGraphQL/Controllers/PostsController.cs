using Microsoft.AspNetCore.Mvc;
using RestVsGraphQL.Data;

namespace RestVsGraphQL.Controllers
{
	[Route("api/post")]
	[ApiController]
	public class PostsController : ControllerBase
	{
		private readonly PostDataService _data;

		public PostsController(PostDataService data)
		{
			_data = data;
		}

		[HttpGet("get")]

		public IActionResult Posts()
		{
			return Ok(_data.GetPosts());
		}

		[HttpGet("{id}")]
		public IActionResult GetPostById(int id)
		{
			var post = _data.GetPosts().Find(p => p.Id == id);
			if (post == null)
				return NotFound();

			return Ok(post);
		}
	}
}
