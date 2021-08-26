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
using TheBestShop.Core.Entities.Concrete;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.DataAccess.Abstract;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.Concrete
{
    public class RoleManager : IRoleService
    {
        IRoleDal _roleDal;

        public RoleManager(IRoleDal roleDal)
        {
            _roleDal = roleDal;
        }


        [SecuredOperation("Admin")]
        [ValidationAspect(typeof(RoleValidator))]
        [CacheRemoveAspect("get")]
        public IResult AddOrUpdateRole(int id, RoleForAdminPageDto data)
        {
            OperationClaim claim = new OperationClaim();
            claim.Name = data.Name;
            claim.Id = id;
            _roleDal.Update(claim);
            return new SuccessResult(id > 0 ? $"{claim.Name}{Messages.Updated}" : $"{claim.Name}{Messages.Added}");
        }

        [SecuredOperation("Admin")]
        [CacheRemoveAspect("get")]
        public IResult Delete(int id)
        {
            var data = _roleDal.Get(c => c.Id == id);
            if (data == null) return new ErrorResult(Messages.UnknownError);
            _roleDal.Delete(data);
            return new SuccessResult($"{data.Name}{Messages.Deleted}");
        }

        [SecuredOperation("Admin")]
        [CacheAspect]
        public IDataResult<List<OperationClaim>> GetAll()
        {
            var data = _roleDal.GetAll();
            int index = data.FindIndex(c => c.Name == "User");
            data.Remove(data[index]);
            return new SuccessDataResult<List<OperationClaim>>(data, Messages.DataGetSuccessfully);
        }

        [SecuredOperation("Admin")]
        public IDataResult<OperationClaim> GetById(int id)
        {
            var data = _roleDal.Get(c => c.Id == id);
            return new SuccessDataResult<OperationClaim>(data, Messages.DataGetSuccessfully);
        }

        public IDataResult<OperationClaim> GetByName(string name)
        {
            var data = _roleDal.Get(c => c.Name == name);
            return new SuccessDataResult<OperationClaim>(data, Messages.DataGetSuccessfully);
        }
    }
}
