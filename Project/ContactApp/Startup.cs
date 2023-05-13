using ContactApp.Models;
using ContactApp.Services.Contact;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;

namespace ContactApp
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
        {
            //Configuration = configuration;

            var builder = new ConfigurationBuilder()
                        .SetBasePath(env.ContentRootPath)
#if DEBUG
                        .AddJsonFile($"appsettings.Development.json", optional: true, reloadOnChange: true)
                        .AddJsonFile($"appsettings.json", optional: true, reloadOnChange: true)
#else
                        .AddJsonFile($"appsettings.Production.json", optional: true, reloadOnChange: true)
#endif
                        .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                );
            });

            //Json Response
            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            //Http Context Accessor
            services.AddHttpContextAccessor();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            var connectionString = Configuration.GetConnectionString("con");
            //services.AddEntityFrameworkProxies();
            services.AddDbContext<DbContextHelper>(opt =>
            {
                opt.UseSqlServer(connectionString);
                opt.EnableSensitiveDataLogging();
                opt.ConfigureWarnings(warnings => warnings.Ignore(CoreEventId.DetachedLazyLoadingWarning));
            });

            #region register services
            services.AddScoped<IContactService, ContactService>();
            #endregion

            // configuration services
            //services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile("Logs/mylog-{Date}.txt");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHsts();

            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseCors("CorsPolicy");

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
