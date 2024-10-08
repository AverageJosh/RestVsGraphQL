using RestVsGraphQL.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services
	.AddGraphQLServer()
	.AddQueryType<GraphQLQuery>();

builder.Services.AddScoped<PostData>();

var app = builder.Build();
app.UseRouting().UseEndpoints(endpoints => endpoints.MapGraphQL());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
