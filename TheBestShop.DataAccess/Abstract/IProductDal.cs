using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.DataAccess;
using TheBestShop.Entity.Concrete;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.DataAccess.Abstract
{
    public interface IProductDal : IEntityRepository<Product>
    {
        Dictionary<string, int> GetAllCompany();
        ProductPaginationDto GetProductsWithPagination(int minPrice, int maxPrice, int selectedCategory, string selectedCompany, int reviewFilter, string searchValue, int pageNumber, int pageSize, int sortData);
        Product GetProductWithCategories(int id);
    }
}
