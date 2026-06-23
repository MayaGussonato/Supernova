using Supernova.Interfaces;
using Supernova.Repositories;
using Supernova.BdContextConnct;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

// Adiciona o contexto do banco de dados
builder.Services.AddDbContext<SuperNovaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Adiciona os repositórios ao container de injeção de dependência
builder.Services.AddScoped<IAlimentoRepository, AlimentoRepository>();
builder.Services.AddScoped<ITipoAlimentoRepository, TipoAlimentoRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultChallengeScheme = "JwtBearer";
    options.DefaultAuthenticateScheme = "JwtBearer";
})

.AddJwtBearer("JwtBearer", options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        // valida quem está solicitando
        ValidateIssuer = true,

        // valida quem está recebendo
        ValidateAudience = true,

        // valida expiração
        ValidateLifetime = true,

        // chave de autenticação
        IssuerSigningKey = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes("supernova-chave-autenticacao-webapi-dev")
        ),

        // tolerância de horário
        ClockSkew = TimeSpan.FromMinutes(5),

        // emissor
        ValidIssuer = "api_supernova",

        // destinatário
        ValidAudience = "api_supernova"
    };
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Supernova API",
        Description = "Uma API para gerenciamento de alimentos"
    });
});

// Controllers
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseAuthentication();

app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger(options => { });

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();