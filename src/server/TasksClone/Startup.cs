using System;
using System.IO;
using System.Linq;
using Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TasksClone.Features.Todos;

namespace server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddPooledDbContextFactory<AppDbContext>(options => options.UseNpgsql(Configuration.GetConnectionString("AppDbContext")));

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder
                        .WithOrigins("http://localhost:3000", "http://localhost:5000", "https://localhost:5001")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            services
                .AddGraphQLServer()
                .AddQueryType<List>()
                .AddMutationType(d => d.Name("Mutation"))
                    .AddTypeExtension<Add.Mutation>()
                    .AddTypeExtension<Check.Mutation>()
                    .AddTypeExtension<Uncheck.Mutation>()
                    .AddTypeExtension<Rename.Mutation>()
                    .AddTypeExtension<Delete.Mutation>();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGraphQL();
            });
        }
    }
}
