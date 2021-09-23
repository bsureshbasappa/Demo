using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastracture.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory){
            
            try 
            {
                if (!context.ProductBrand.Any())
                {
                    var brandsData = File.ReadAllText("../Infrastracture/Data/SeedData/brands.json");
                    var brands= JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                    foreach(var item in brands)
                    {
                        context.ProductBrand.Add(item);
                    }
                    await context.SaveChangesAsync();
                }


                if (!context.ProductType.Any())
                {
                    var typessData = File.ReadAllText("../Infrastracture/Data/SeedData/types.json");
                    var types= JsonSerializer.Deserialize<List<ProductType>>(typessData);

                    foreach(var item in types)
                    {
                        context.ProductType.Add(item);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var ProductsData = File.ReadAllText("../Infrastracture/Data/SeedData/products.json");
                    var products= JsonSerializer.Deserialize<List<Product>>(ProductsData);

                    foreach(var item in products)
                    {
                        context.Products.Add(item);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.DeliveryMethods.Any())
                {
                    var dmData = File.ReadAllText("../Infrastracture/Data/SeedData/delivery.json");
                    var methods= JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);

                    foreach(var item in methods)
                    {
                        context.DeliveryMethods.Add(item);
                    }
                    await context.SaveChangesAsync();
                }

            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}