using System.Threading.Tasks;
using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        
        [HttpPost("{basketId}")]
        [Authorize]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket = await _paymentService.CreateorUpdatePaymentIntent(basketId);
 
            if (basket == null) return BadRequest(new ApiResponse(400, "Problem with your basket"));
 
            return basket;
        }

    }
}