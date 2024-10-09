using RestVsGraphQL.Data;
using RestVsGraphQL.GraphQL;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services
	.AddGraphQLServer()
	.AddMutationConventions(true)
	.AddInMemorySubscriptions()
	.AddSubscriptionType<GraphQLSubscription>()
	.AddQueryType<GraphQLQuery>()
	.AddMutationType<GraphQLMutation>()
	.RegisterService<PostDataService>();

builder.Services.AddScoped<PostDataService>();

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

app.UseWebSockets();

using (var scope = app.Services.CreateScope())
{
	var data = scope.ServiceProvider.GetService<PostDataService>();

	data?.Load();
}


app.Run();
