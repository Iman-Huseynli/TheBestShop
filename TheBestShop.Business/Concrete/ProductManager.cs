using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Business.Abstract;
using TheBestShop.Business.BusinessAspects.Autofac;
using TheBestShop.Business.Constants;
using TheBestShop.Business.ValidationRules.FluentValidation;
using TheBestShop.Core.Aspects.Autofac.Caching;
using TheBestShop.Core.Aspects.Autofac.Validation;
using TheBestShop.Core.Utilities.Business;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.DataAccess.Abstract;
using TheBestShop.Entity.Concrete;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.Concrete
{
    public class ProductManager : IProductService
    {
        IProductDal _productDal;

        public ProductManager(IProductDal productDal)
        {
            _productDal = productDal;
        }


        [SecuredOperation("Admin")]
        [ValidationAspect(typeof(ProductValidator))]
        [CacheRemoveAspect("get")]
        public IResult AddOrUpdateProduct(int id, AddingProductDto data, string userName)
        {
            var random = new Random();
            var product = new Product();
            product.Name = data.Name;
            product.Quality = random.Next(1, 5).ToString();
            product.Id = id;
            product.Availability = Convert.ToInt32(data.Quantity) > 0 ? true : false;
            product.Description = data.Description;
            product.Price = Convert.ToDecimal(data.Price.Replace('.', ','));
            product.Weight = Convert.ToDecimal(data.Weight.Replace('.', ','));
            product.CompanyName = data.CompanyName;
            product.Image = data.Image;
            product.Quantity = Convert.ToInt32(data.Quantity);
            if (id != 0)
            {
                var temp = _productDal.Get(c => c.Id == id);
                product.UpdateUser = userName;
                product.UpdateDate = DateTime.Now;
                if (temp != null)
                {
                    product.CreateUser = temp.CreateUser;
                    product.CreateDate = temp.CreateDate;
                }
            }
            else
            {
                product.CreateUser = userName;
                product.CreateDate = DateTime.Now;
            }
            if (data.CategoryIds[0] != null)
            {
                List<string> categoryList = new List<string>();
                categoryList.AddRange(data.CategoryIds?.SelectMany(c => c.Split(",")).ToList());
                product.ProductsCategories = categoryList.Select(c => new ProductCategories
                {
                    CategoryId = int.Parse(c),
                    ProductId = product.Id
                }).ToList();
            }
            _productDal.Update(product);
            return new SuccessResult(id > 0 ? $"{product.Name}{Messages.Updated}" : $"{product.Name}{Messages.Added}");
        }

        [SecuredOperation("Admin")]
        [CacheRemoveAspect("get")]
        public IResult Delete(int id)
        {
            var data = _productDal.Get(c => c.Id == id);
            if (data == null) return new ErrorResult(Messages.UnknownError);
            _productDal.Delete(data);
            return new SuccessResult($"{data.Name}{Messages.Deleted}");
        }

        public IDataResult<Product> Get(int id)
        {
            var data = _productDal.Get(c => c.Id == id);
            return new SuccessDataResult<Product>(data, Messages.DataGetSuccessfully);
        }

        [CacheAspect]
        public IDataResult<List<Product>> GetAll()
        {
            var data = _productDal.GetAll(c => c.Availability == true);
            return new SuccessDataResult<List<Product>>(data, Messages.DataGetSuccessfully);
        }

        public IDataResult<List<Product>> GetFeaturedProducts()
        {
            var random = new Random();
            var count = _productDal.GetAll(filter: null, x => x.OrderByDescending(d => d.Id)).FirstOrDefault();
            var randomCount = random.Next(1, count.Id);
            var data = _productDal.GetAll(c => c.Id > randomCount && c.Availability == true).Take(15).ToList();
            return new SuccessDataResult<List<Product>>(data, Messages.DataGetSuccessfully);
        }

        public IDataResult<List<Product>> GetBestSelling()
        {
            var random = new Random();
            var count = _productDal.GetAll(filter: null, x => x.OrderByDescending(d => d.Id)).FirstOrDefault();
            var randomCount = random.Next(1, count.Id);
            var data = _productDal.GetAll(c => c.Id > randomCount && c.Availability == true).Take(15).ToList();
            return new SuccessDataResult<List<Product>>(data, Messages.DataGetSuccessfully);
        }

        public IDataResult<List<Product>> GetBestPriceProducts()
        {
            var random = new Random();
            var count = _productDal.GetAll(filter: null, x => x.OrderByDescending(d => d.Id)).FirstOrDefault();
            var randomCount = random.Next(1, count.Id);
            var data = _productDal.GetAll(c => c.Id > randomCount && c.Availability == true).Take(15).ToList();
            return new SuccessDataResult<List<Product>>(data, Messages.DataGetSuccessfully);
        }

        public IDataResult<List<Product>> GetMostViewed()
        {
            var random = new Random();
            var count = _productDal.GetAll(filter: null, x => x.OrderByDescending(d => d.Id)).FirstOrDefault();
            var randomCount = random.Next(1, count.Id);
            var data = _productDal.GetAll(c => c.Id > randomCount && c.Availability == true).Take(15).ToList();
            return new SuccessDataResult<List<Product>>(data, Messages.DataGetSuccessfully);
        }

        public IDataResult<List<Product>> GetProductsByCategory(int categoryId)
        {
            throw new NotImplementedException();
        }

        public IDataResult<ProductPaginationDto> GetProductsWithPagination(int minPrice, int maxPrice, int selectedCategory, string selectedCompany, int reviewFilter, string searchValue, int pageNumber = 1, int pageSize = 50, int sortData = 0)
        {
            var filter = _productDal.GetProductsWithPagination(minPrice, maxPrice, selectedCategory, selectedCompany, reviewFilter, searchValue, pageNumber, pageSize, sortData);
            return new SuccessDataResult<ProductPaginationDto>(filter, Messages.DataGetSuccessfully);
        }

        public IDataResult<List<CompanyDto>> GetAllCompany()
        {
            var temp = _productDal.GetAllCompany();
            var data = new List<CompanyDto>();
            temp.Keys.ToList().ForEach(c => data.Add(new CompanyDto { Name = c, Checked = false }));
            return new SuccessDataResult<List<CompanyDto>>(data, Messages.DataGetSuccessfully);
        }

        public IDataResult<int> Count()
        {
            var data = _productDal.Count();
            return new SuccessDataResult<int>(data, Messages.DataGetSuccessfully);
        }

        public IDataResult<Product> GetProductWithCategories(int id)
        {
            var result = _productDal.GetProductWithCategories(id);
            return new SuccessDataResult<Product>(result, Messages.DataGetSuccessfully);
        }


        private IResult CheckIfProductNameIsExists(string name)
        {
            var result = _productDal.GetAll(c => c.Name == name).Any();
            return result == true ? new ErrorResult(Messages.NameAlreadyExists) : new SuccessResult();
        }
    }
}
