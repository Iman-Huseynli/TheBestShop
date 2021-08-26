using NigroCandle.Entity.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities.Concrete;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.Abstract
{
    public interface IUserService
    {
        List<OperationClaim> GetClaims(User user);
        IResult Add(User entity);
        IResult Update(User entity);
        IResult Delete(User entity);
        IDataResult<User> GetById(int id);
        bool AddUserToOperation(string operationName, int userId);
        User GetByMail(string email);
        IDataResult<GetUserWithRolesDto> GetUserWithRoles(int id);
        IResult ChangeUserData(ChangeUserDataDto entity);
        IResult ChangePassword(ChangeUserDataDto entity);
        IDataResult<ChangeUserDataDto> GetUserData(int userId);
        IResult CloseAccount(int id);
    }
}
