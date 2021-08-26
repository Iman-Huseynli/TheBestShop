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
    public interface ICategoryService
    {
        IDataResult<List<Category>> GetAll();
        IDataResult<Category> GetById(int id);
        IResult AddOrUpdateCategory(int id, AddingCategoryDto data, string userName);
        IResult Delete(int id);
    }
}
