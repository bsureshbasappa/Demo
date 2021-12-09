using System.Linq;
using API.Errors;
using Core.Interfaces;
using Infrastracture.Data;
using Infrastracture.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;


namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddSingleton<IResponseCacheService, ResponseCacheServices>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IUnitOfWork, UnithOfWork>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));

            services.Configure<ApiBehaviorOptions>(options=>
            {

                options.InvalidModelStateResponseFactory = ActionContext =>
                {
                    var errors = ActionContext.ModelState
                                .Where(e=>e.Value.Errors.Count>0)
                                .SelectMany(x=>x.Value.Errors)
                                .Select(x=>x.ErrorMessage).ToArray();
                    var errorResponse = new ApiValidationErrorResponce
                    {
                        Errors=errors
                    };
                    
                    return new BadRequestObjectResult(errorResponse);
                };

            });

            return services;

        }
    }
}