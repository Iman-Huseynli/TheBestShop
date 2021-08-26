using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.Entity.Concrete;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.Abstract
{
    public interface IProductService
    {
        IDataResult<List<Product>> GetAll();
        IDataResult<List<CompanyDto>> GetAllCompany();
        IDataResult<List<Product>> GetFeaturedProducts();
        IDataResult<List<Product>> GetMostViewed();
        IDataResult<List<Product>> GetBestSelling();
        IDataResult<List<Product>> GetBestPriceProducts();
        IDataResult<List<Product>> GetProductsByCategory(int categoryId);
        IDataResult<ProductPaginationDto> GetProductsWithPagination(int minPrice, int maxPrice, int selectedCategory, string selectedCompany, int reviewFilter, string searchValue, int pageNumber = 1, int pageSize = 50, int sortData = 0);
        IDataResult<Product> Get(int id);
        IDataResult<Product> GetProductWithCategories(int id);
        IDataResult<int> Count();
        IResult AddOrUpdateProduct(int id, AddingProductDto data, string userName);
        IResult Delete(int id);
    }
}
