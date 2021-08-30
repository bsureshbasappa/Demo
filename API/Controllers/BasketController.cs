using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        public BasketController(IBasketRepository basketRepository)
        {
            _basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.getBasketAsync(id);

            return Ok(basket ?? new Core.Entities.CustomerBasket(id));

        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
        {
            var UpdatedBasket = await _basketRepository.UpdateBasketAsync(basket);

            return Ok(UpdatedBasket);

        }

        [HttpDelete] 
        public async Task DeleteBasket(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);

        }
    }
}