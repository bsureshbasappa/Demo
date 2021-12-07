using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specification;
using Microsoft.Extensions.Configuration;
using Stripe;
using Order = Core.Entities.OrderAggregate.Order;
using Product = Core.Entities.Product;

namespace Infrastracture.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        public PaymentService(IBasketRepository basketRepository, IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _configuration = configuration;
            _unitOfWork = unitOfWork;
            _basketRepository = basketRepository;
        }

        public async Task<CustomerBasket> CreateorUpdatePaymentIntent(string basketId)
        {
            StripeConfiguration.ApiKey=_configuration["StripeSettings:SecretKey"];

            var basket = await _basketRepository.GetBasketAsync(basketId);

            if(basket==null) return null;

            var shippingPrice = 0m;
            if(basket.DeliveryMethodId.HasValue)
            {
                var delivaryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsyc((int)basket.DeliveryMethodId);
                shippingPrice = delivaryMethod.Price;
            }

            foreach (var item in basket.Items)
            {
                var prouductItem = await _unitOfWork.Repository<Product>().GetByIdAsyc(item.Id);   
                if(item.Price !=prouductItem.Price)
                {
                    item.Price = prouductItem.Price;
                }
            }

                var service = new PaymentIntentService();
                PaymentIntent intent;
                if(string.IsNullOrEmpty(basket.PaymentIntentId))
                {
                    var options = new PaymentIntentCreateOptions
                    {
                        Amount = (long)basket.Items.Sum(i=> i.Quantity*(i.Price*100))+(long)shippingPrice*100,
                        Currency="usd",
                        PaymentMethodTypes = new List<string>{"card"} 

                    };
                    intent = await service.CreateAsync(options);
                    basket.PaymentIntentId=intent.Id;
                    basket.ClientSecret=intent.ClientSecret;

                    
                }
                else
                {
                    var options = new PaymentIntentUpdateOptions
                    {
                        Amount = (long)basket.Items.Sum(i=> i.Quantity*(i.Price*100)) + (long)shippingPrice*100,
                    };
                    await service.UpdateAsync(basket.PaymentIntentId, options);
                }
                await _basketRepository.UpdateBasketAsync(basket);

                return basket;
        }

        public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
            
            if(order==null) return null;

            order.Status=OrderStatus.PymentFailed;
            await _unitOfWork.Complete();
            
            return order;

        }

        public async Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if(order==null) return null;

            order.Status=OrderStatus.PaymentRecevied;
            _unitOfWork.Repository<Order>().Update(order);

            await _unitOfWork.Complete();
            return order;

        }
    }
}