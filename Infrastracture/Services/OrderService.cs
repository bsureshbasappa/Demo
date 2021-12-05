using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specification;

namespace Infrastracture.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPaymentService _paymentService;
        public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork, IPaymentService paymentService)
        {
            _paymentService = paymentService;
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;

        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shipmentAddress)
        {
            //Get basekt from the repo
            var basket = await _basketRepo.GetBasketAsync(basketId);

            //Get items from the product repo
            var items = new List<OrderItem>();

            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsyc(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            //Get Delevery Method from repo
            var delivaryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsyc(deliveryMethodId);

            // Calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            // check to see if order exists 
            var spec = new OrderPaymentIntentIdWithItemsSpecification(basket.PaymentIntentId);
            var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if(existingOrder!=null){
                _unitOfWork.Repository<Order>().Delete(existingOrder);
                await _paymentService.CreateorUpdatePaymentIntent(basket.PaymentIntentId);
            }


            //Create a Order
            var order = new Order(items, buyerEmail, shipmentAddress, delivaryMethod, subtotal, basket.PaymentIntentId);
            _unitOfWork.Repository<Order>().Add(order);

            //Save to db

            var result = await _unitOfWork.Complete();

            if(result <=0) return null;


            //Return order
            return order;


        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDelivaryMethodsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();

        }

        public async Task<Order> GetOrdersByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrderWithItemsAndOrderingSpecification(id,buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrderWithItemsAndOrderingSpecification(buyerEmail);

            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}