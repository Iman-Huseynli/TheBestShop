using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.DataAccess.EntityFramework;
using TheBestShop.Core.Extensions;
using TheBestShop.DataAccess.Abstract;
using TheBestShop.Entity.Concrete;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.DataAccess.Concrete.EntityFramework
{
    public class EfCoreProductDal : EfRepositoryBase<Product, TheBestShopContext>, IProductDal
    {
        public Dictionary<string, int> GetAllCompany()
        {
            using (var context = new TheBestShopContext())
            {
                var companies = context.Products.GroupBy(c => c.CompanyName).Select(c => new { c.Key, Count = c.Count() }).ToDictionary(c => c.Key, c => c.Count);
                return companies;
            }
        }

        public ProductPaginationDto GetProductsWithPagination(int minPrice, int maxPrice, int selectedCategory, string selectedCompany, int reviewFilter, string searchValue, int pageNumber, int pageSize, int sortData)
        {
            using (var context = new TheBestShopContext())
            {
                var result = context.Products.AsQueryable();
                switch (sortData)
                {
                    case 1:
                        result = result.OrderBy(c => c.Name);
                        break;
                    case 2:
                        result = result.OrderByDescending(c => c.Name);
                        break;
                    case 3:
                        result = result.OrderBy(c => c.Price);
                        break;
                    case 4:
                        result = result.OrderByDescending(c => c.Price);
                        break;
                    default:
                        break;
                }
                if (minPrice >= 0)
                {
                    result = result.Where(c => c.Price > minPrice);
                }
                if (maxPrice > 0)
                {
                    result = result.Where(c => c.Price < maxPrice);
                }
                if (selectedCompany != null)
                {
                    var temp = selectedCompany.Split(',');
                    var predicate = PredicateBuilder.Get<Product>();

                    foreach (string word in selectedCompany.Split(','))
                        predicate = predicate.Or(f => f.CompanyName == word);
                    result = result.Where(predicate);
                }
                if (reviewFilter > 0)
                {
                    result = result.Where(c => Convert.ToInt32(c.Quality) >= reviewFilter);
                }
                if (selectedCategory > 0)
                {
                    result = result.Include(c => c.ProductsCategories).ThenInclude(c => c.Category).Where(c => c.ProductsCategories.Any(x => x.CategoryId == selectedCategory));
                }
                if (!string.IsNullOrEmpty(searchValue))
                {
                    result = result.Where(c => c.Name.ToLower().StartsWith(searchValue.ToLower()));
                }

                var products = result.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
                int count = result.ToList().Count;
                products.ForEach(c => c.ProductsCategories = null);
                var productPagination = new ProductPaginationDto { Products = products, PaginationCount = Math.Ceiling((decimal)count / pageSize), ProductsCount = count };
                return productPagination;
            }
        }

        public Product GetProductWithCategories(int id)
        {
            using (var context = new TheBestShopContext())
            {
                return context.Products.Include(c => c.ProductsCategories).ThenInclude(c => c.Category).Where(c => c.ProductsCategories.Any(x => x.ProductId == id)).FirstOrDefault(c => c.Id == id);
            }
        }

        public override void Update(Product entity)
        {
            using (var context = new TheBestShopContext())
            {
                if (entity.ProductsCategories != null)
                {
                    var temp = context.ProductCategories.Where(c => c.ProductId == entity.Id).ToList();
                    if (temp.Count > 0) context.Set<ProductCategories>().RemoveRange(temp);
                    context.Set<ProductCategories>().AddRange(entity.ProductsCategories);
                }
                context.Products.Update(entity);
                context.SaveChanges();
            }
        }
    }
}
