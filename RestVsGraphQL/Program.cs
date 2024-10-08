using RestVsGraphQL.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services
	.AddGraphQLServer()
	.AddQueryType<GraphQLQuery>();

builder.Services.AddScoped<PostData>();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAllOrigins", builder =>
	{
		builder.AllowAnyOrigin()
			.AllowAnyMethod()
			.AllowAnyHeader();
	});
});

var app = builder.Build();
app.UseCors("AllowAllOrigins");

app.UseRouting().UseEndpoints(endpoints => endpoints.MapGraphQL());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.Run();
