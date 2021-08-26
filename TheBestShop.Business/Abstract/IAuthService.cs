using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities.Concrete;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.Core.Utilities.Securiy.JWT;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.Abstract
{
    public interface IAuthService
    {
        IDataResult<User> Register(UserForRegisterDto entity);
        IDataResult<User> Login(UserForLoginDto entity);
        IResult Delete(int id);
        IResult CheckIsAuth();
        IResult CheckIsAdmin();
        IResult UserExists(string email);
        IDataResult<AccessToken> CreateAccessToken(User user);
        IResult AddOrUpdateUser(int id, AddOrUpdateUserDto entity);
    }
}
