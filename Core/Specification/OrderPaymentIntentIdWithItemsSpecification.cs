using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;

namespace Core.Specification
{
    public class OrderPaymentIntentIdWithItemsSpecification : BaseSpecificaiton<Order>
    {
        public OrderPaymentIntentIdWithItemsSpecification(string paymentIntentId)
         : base(o => o.PaymentIntentId == paymentIntentId)
        {
        }
    }
}