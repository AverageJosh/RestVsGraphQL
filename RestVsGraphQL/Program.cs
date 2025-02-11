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
		.AddTypeExtension<GraphQLQueryExtension>()
	.AddMutationType<GraphQLMutation>()
	.AddFiltering()
	.AddSorting();

builder.Services.AddScoped<PostDataService>();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAllOrigins", builder =>
	{
		builder
			.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .SetIsOriginAllowed(_ => true);
	});
});

var app = builder.Build();

app.UseWebSockets();
app.UseCors("AllowAllOrigins");

app.UseRouting();
app.MapGraphQL();

app.UseHttpsRedirection();

app.MapControllers();


using (var scope = app.Services.CreateScope())
{
	var data = scope.ServiceProvider.GetService<PostDataService>();

	data?.Load();
}


app.Run();
