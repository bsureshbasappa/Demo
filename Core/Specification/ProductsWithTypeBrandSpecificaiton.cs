using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specification
{
    public class ProductsWithTypeBrandSpecificaiton : BaseSpecificaiton<Product>
    {
        public ProductsWithTypeBrandSpecificaiton()
        {
            AddIncludes(x=>x.ProductType);
            AddIncludes(x=>x.ProductBrand);

        }

        public ProductsWithTypeBrandSpecificaiton(int id) : base(x=> x.Id==id)
        {
            AddIncludes(x=>x.ProductType);
            AddIncludes(x=>x.ProductBrand);
        }
    }
}