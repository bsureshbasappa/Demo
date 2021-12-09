using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Infrastracture.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _ProducRepo;
        private readonly IGenericRepository<ProductBrand> _ProductBrandRepo;
        private readonly IGenericRepository<ProductType> _ProductTypeRepo;
        private readonly IMapper _mapper;
        public ProductsController(IGenericRepository<Product> ProducRepo, 
                                IGenericRepository<ProductBrand> ProductBrandRepo, 
                                IGenericRepository<ProductType> ProductTypeRepo, 
                                IMapper mapper)
        {
            _mapper = mapper;
            _ProductTypeRepo = ProductTypeRepo;
            _ProductBrandRepo = ProductBrandRepo;
            _ProducRepo = ProducRepo;


        }

        [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
            [FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypeBrandSpecificaiton(productParams);

            var countSpec = new ProductWithFilterForCountSpecification(productParams);

            var totalItems= await _ProducRepo.CountAsync(countSpec);

            var products = await _ProducRepo.ListAsync(spec);
        

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [Cached(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypeBrandSpecificaiton(id);
            var product = await _ProducRepo.GetEntityWithSpec(spec);
            if(product==null) return NotFound(new ApiResponse(404));
            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [Cached(600)]
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _ProductBrandRepo.ListAllAsync());
        }

        [Cached(600)]
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypess()
        {
            return Ok(await _ProductTypeRepo.ListAllAsync());
        }

    }
}