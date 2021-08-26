using System;
using System.Collections.Generic;
using System.Linq;
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
    public class CategoryManager : ICategoryService
    {
        ICategoryDal _categoryDal;

        public CategoryManager(ICategoryDal categoryDal)
        {
            _categoryDal = categoryDal;
        }

        [SecuredOperation("Admin")]
        [ValidationAspect(typeof(CategoryValidator))]
        [CacheRemoveAspect("get")]
        public IResult AddOrUpdateCategory(int id, AddingCategoryDto data, string userName)
        {
            Category category = new Category();
            category.Name = data.Name;
            category.Id = id;
            if (id != 0)
            {
                var temp = _categoryDal.Get(c => c.Id == id);
                category.UpdateUser = userName;
                category.UpdateDate = DateTime.Now;
                if (temp != null)
                {
                    category.CreateUser = temp.CreateUser;
                    category.CreateDate = temp.CreateDate;
                }
            }
            else
            {
                category.CreateUser = userName;
                category.CreateDate = DateTime.Now;
            }
            _categoryDal.Update(category);
            return new SuccessResult(id > 0 ? $"{category.Name}{Messages.Updated}" : $"{category.Name}{Messages.Added}");
        }


        [SecuredOperation("Admin")]
        [CacheRemoveAspect("get")]
        public IResult Delete(int id)
        {
            var data = _categoryDal.Get(c => c.Id == id);
            if (data == null) return new ErrorResult(Messages.UnknownError);
            _categoryDal.Delete(data);
            return new SuccessResult($"{data.Name}{Messages.Deleted}");
        }

        public IDataResult<Category> GetById(int id)
        {
            var data = _categoryDal.Get(c => c.Id == id);
            return new SuccessDataResult<Category>(data, Messages.DataGetSuccessfully);
        }

        [CacheAspect]
        public IDataResult<List<Category>> GetAll()
        {
            var data = _categoryDal.GetAll();
            return new SuccessDataResult<List<Category>>(data, Messages.DataGetSuccessfully);
        }

        private IResult CheckIfCategoryNameIsExists(string name)
        {
            var result = _categoryDal.GetAll(c => c.Name == name).Any();
            return result == true ? new ErrorResult(Messages.NameAlreadyExists) : new SuccessResult();
        }
    }
}
