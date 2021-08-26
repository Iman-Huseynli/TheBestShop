using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Business.Abstract;
using TheBestShop.Business.BusinessAspects.Autofac;
using TheBestShop.Business.Constants;
using TheBestShop.Core.Entities.Concrete;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.DataAccess.Abstract;
using TheBestShop.Entity.Concrete;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.Concrete
{
    public class AdminManager : IAdminService
    {
        IProductDal _productdal;
        ICategoryDal _categoryDal;
        IUserDal _userDal;
        IRoleDal _roleDal;

        public AdminManager(IProductDal productdal, ICategoryDal categoryDal, IUserDal userDal, IRoleDal roleDal)
        {
            _productdal = productdal;
            _categoryDal = categoryDal;
            _userDal = userDal;
            _roleDal = roleDal;
        }

        [SecuredOperation("Admin")]
        public IResult GetAllData(string tableName, string searchValue, int pageNumber, int pageSize)
        {
            int count = 0;
            switch (tableName)
            {
                case "product":
                    var products = string.IsNullOrEmpty(searchValue) ? _productdal.Pagination(null, null, pageNumber, pageSize) : _productdal.Pagination(c => c.Name.ToLower().StartsWith(searchValue.ToLower()) || c.CompanyName.ToLower().StartsWith(searchValue.ToLower()), null, pageNumber, pageSize);
                    count = string.IsNullOrEmpty(searchValue) ? _productdal.Count() : _productdal.Count(c => c.Name.ToLower().StartsWith(searchValue.ToLower()) || c.CompanyName.ToLower().StartsWith(searchValue.ToLower()));
                    var product = new List<ProductForAdminPageDto>();
                    products?.ForEach(c =>
                    {
                        product.Add(new ProductForAdminPageDto
                        {
                            Id = c.Id,
                            Name = c.Name,
                            CompanyName = c.CompanyName,
                            Availability = c.Availability,
                            Description = c.Description,
                            Price = c.Price,
                            Quality = c.Quality,
                            Quantity = c.Quantity,
                            Weight = c.Weight,
                            CreateUser = c.CreateUser,
                            CreateDate = c.CreateDate,
                            UpdateUser = c.UpdateUser,
                            UpdateDate = c.UpdateDate
                        });
                    });
                    AdminPageDto<ProductForAdminPageDto> productData = new AdminPageDto<ProductForAdminPageDto> { Data = product, Count = count, PaginationCount = Convert.ToInt32(Math.Ceiling((decimal)count / pageSize)) };
                    return new SuccessDataResult<AdminPageDto<ProductForAdminPageDto>>(productData, Messages.DataGetSuccessfully);
                case "category":
                    var categories = string.IsNullOrEmpty(searchValue) ? _categoryDal.Pagination(null, null, pageNumber, pageSize) : _categoryDal.Pagination(c => c.Name.ToLower().StartsWith(searchValue.ToLower()), null, pageNumber, pageSize);
                    count = string.IsNullOrEmpty(searchValue) ? _categoryDal.Count() : _categoryDal.Count(c => c.Name.ToLower().StartsWith(searchValue.ToLower()));
                    var category = new List<CategoryFormAdminPageDto>();
                    categories?.ForEach(c =>
                    {
                        category.Add(new CategoryFormAdminPageDto
                        {
                            Id = c.Id,
                            Name = c.Name,
                            CreateUser = c.CreateUser,
                            CreateDate = c.CreateDate,
                            UpdateUser = c.UpdateUser,
                            UpdateDate = c.UpdateDate 
                        });
                    });
                    AdminPageDto<CategoryFormAdminPageDto> categoryData = new AdminPageDto<CategoryFormAdminPageDto> { Data = category, Count = count, PaginationCount = Convert.ToInt32(Math.Ceiling((decimal)count / pageSize)) };
                    return new SuccessDataResult<AdminPageDto<CategoryFormAdminPageDto>>(categoryData, Messages.DataGetSuccessfully);
                case "user":
                    var users = string.IsNullOrEmpty(searchValue) ? _userDal.Pagination(null, null, pageNumber, pageSize) : _userDal.Pagination(c => c.UserName.ToLower().StartsWith(searchValue.ToLower()) || c.Email.ToLower().StartsWith(searchValue.ToLower()) || c.FirstName.ToLower().StartsWith(searchValue.ToLower()) || c.LastName.ToLower().StartsWith(searchValue.ToLower()), null, pageNumber, pageSize);
                    count = string.IsNullOrEmpty(searchValue) ? _userDal.Count() : _userDal.Count(c => c.UserName.ToLower().StartsWith(searchValue.ToLower()) || c.Email.ToLower().StartsWith(searchValue.ToLower()) || c.FirstName.ToLower().StartsWith(searchValue.ToLower()) || c.LastName.ToLower().StartsWith(searchValue.ToLower()));
                    List<UserForAdminPageDto> user = new List<UserForAdminPageDto>();
                    users?.ForEach(c =>
                    {
                        user.Add(new UserForAdminPageDto
                        {
                            Id = c.Id,
                            Email = c.Email,
                            UserName = c.UserName,
                            FirstName = c.FirstName,
                            LastName = c.LastName,
                            Status = c.Status,
                            RegisterDate = c.RegisterDate
                        });
                    });
                    AdminPageDto<UserForAdminPageDto> userData = new AdminPageDto<UserForAdminPageDto> { Data = user, Count = count, PaginationCount = Convert.ToInt32(Math.Ceiling((decimal)count / pageSize)) };
                    return new SuccessDataResult<AdminPageDto<UserForAdminPageDto>>(userData, Messages.DataGetSuccessfully);
                case "role":
                    var roles = string.IsNullOrEmpty(searchValue) ? _roleDal.Pagination(c => c.Name != "User", null, pageNumber, pageSize) : _roleDal.Pagination(c => c.Name.ToLower().StartsWith(searchValue.ToLower()) && c.Name != "User", null, pageNumber, pageSize);
                    count = string.IsNullOrEmpty(searchValue) ? _roleDal.Count(c => c.Name != "User") : _roleDal.Count(c => c.Name.ToLower().StartsWith(searchValue.ToLower()) && c.Name != "User");
                    var role = new List<RoleForAdminPageDto>();
                    roles?.ForEach(c =>
                    {
                        role.Add(new RoleForAdminPageDto
                        {
                            Id = c.Id,
                            Name = c.Name
                        });
                    });
                    AdminPageDto<RoleForAdminPageDto> roleData = new AdminPageDto<RoleForAdminPageDto> { Data = role, Count = count, PaginationCount = Convert.ToInt32(Math.Ceiling((decimal)count / pageSize)) };
                    return new SuccessDataResult<AdminPageDto<RoleForAdminPageDto>>(roleData, Messages.DataGetSuccessfully);

                default:
                    return new ErrorResult();
            }
        }


    }
}
