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
        public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;

        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shipmentAddress)
        {
            //Get basekt from the repo
            var basekt = await _basketRepo.GetBasketAsync(basketId);

            //Get items from the product repo
            var items = new List<OrderItem>();

            foreach (var item in basekt.Items)
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

            //Create a Order
            var order = new Order(items, buyerEmail, shipmentAddress, delivaryMethod, subtotal);
            _unitOfWork.Repository<Order>().Add(order);

            //Save to db

            var result = await _unitOfWork.Complete();

            if(result <=0) return null;

            //Delete basjet
            await _basketRepo.DeleteBasketAsync(basketId);


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