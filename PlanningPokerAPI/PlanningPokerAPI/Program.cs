global using Microsoft.EntityFrameworkCore;
global using PlanningPokerAPI.Data;
using PlanningPokerAPI.Helper;
using PlanningPokerAPI.Hub;
using PlanningPokerAPI.Interfaces;
using PlanningPokerAPI.Models;
using PlanningPokerAPI.Repository;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddDbContext<DataContext>(options =>
                        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString")));




builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IGuestUserRepository, GuestUserRepository>();
builder.Services.AddTransient<IConnectedUserRepository, ConnectedUserRepository>();
builder.Services.AddTransient<INotificationMessageRepository, NotificationMessageRepository>();
builder.Services.AddTransient<IRoomRepository, RoomRepository>();
builder.Services.AddTransient<IEmailSenderRepository, EmailSenderRepository>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<LobbyHub>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {

        builder.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddSingleton<IDictionary<string, UserConnection>>(options => new Dictionary<string, UserConnection>());

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseDeveloperExceptionPage();
app.UseSwagger();
app.UseSwaggerUI();


app.UseRouting();

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapHub<LobbyHub>("/lobby");

app.MapControllers();


app.Run();
