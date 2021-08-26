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
using TheBestShop.Core.Aspects.Autofac.Transaction;
using TheBestShop.Core.Aspects.Autofac.Validation;
using TheBestShop.Core.Entities.Concrete;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.Core.Utilities.Securiy.Hashing;
using TheBestShop.Core.Utilities.Securiy.JWT;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.Concrete
{
    public class AuthManager : IAuthService
    {
        IUserService _userService;
        ITokenHelper _tokenHelper;
        ICartService _cartService;
        IRoleService _roleService;

        public AuthManager(ITokenHelper tokenHelper, IUserService userService, ICartService cartService, IRoleService roleService)
        {
            _tokenHelper = tokenHelper;
            _userService = userService;
            _cartService = cartService;
            _roleService = roleService;
        }


        public IDataResult<AccessToken> CreateAccessToken(User user)
        {
            var claims = _userService.GetClaims(user);
            var accessToken = _tokenHelper.CreateToken(user, claims);
            return new SuccessDataResult<AccessToken>(accessToken, $"{user.UserName} {Messages.SuccessfulLogin}");
        }

        [SecuredOperation("User")]
        public IResult CheckIsAuth()
        {
            return new SuccessResult();
        }

        [SecuredOperation("Admin")]
        public IResult CheckIsAdmin()
        {
            return new SuccessResult();
        }

        public IDataResult<User> Login(UserForLoginDto entity)
        {
            var userToCheck = _userService.GetByMail(entity.Email);
            if (userToCheck == null)
            {
                return new ErrorDataResult<User>(Messages.UserNotFound);
            }
            if (!HashingHelper.VerifyPasswordHash(entity.Password, userToCheck.PasswordHash, userToCheck.PasswordSalt))
            {
                throw new Exception(Messages.ErrorLogin);
            }
            return new SuccessDataResult<User>(userToCheck, Messages.SuccessfulLogin);
        }

        [ValidationAspect(typeof(UserForRegisterValidator))]
        [TransactionScopeAspect]
        public IDataResult<User> Register(UserForRegisterDto entity)
        {
            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(entity.Password, out passwordHash, out passwordSalt);
            var user = new User
            {
                Email = entity.Email,
                UserName = entity.UserName,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Status = true,
                RegisterDate = DateTime.Now,
            };
            var registerResult = _userService.Add(user);
            if (!registerResult.IsSuccess) return new ErrorDataResult<User>(Messages.UnknownError);

            var role = _roleService.GetByName("User");
            if (role == null)
            {
                var newRole = new RoleForAdminPageDto();
                newRole.Name = "User";
                _roleService.AddOrUpdateRole(0, newRole);
            }
            bool result = _userService.AddUserToOperation("User", user.Id);
            if (result == false) return new ErrorDataResult<User>(Messages.UnknownError);
            _cartService.Add(new Entity.Concrete.Cart { UserId = user.Id });

            return new SuccessDataResult<User>(user, $"{user.UserName} {Messages.UserRegistered}");
        }

        [SecuredOperation("Admin")]
        [CacheRemoveAspect("get")]
        public IResult Delete(int id)
        {
            var user = _userService.GetById(id);
            if (user == null) return new ErrorDataResult<User>(Messages.UserNotFound);
            _userService.Delete(user.Data);
            return new SuccessResult($"{user.Data.UserName} {Messages.Deleted}");
        }

        public IResult UserExists(string email)
        {
            if (_userService.GetByMail(email) != null)
            {
                return new ErrorResult(Messages.UserAlreadyExists);
            }
            return new SuccessResult();
        }

        [SecuredOperation("Admin")]
        [ValidationAspect(typeof(AddOrUpdateUserValidator))]
        [CacheRemoveAspect("get")]
        public IResult AddOrUpdateUser(int id, AddOrUpdateUserDto entity)
        {
            User user = new User();
            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(entity.Password, out passwordHash, out passwordSalt);
            user.Id = id;
            user.Email = entity.Email;
            user.UserName = entity.UserName;
            user.FirstName = entity.FirstName;
            user.LastName = entity.LastName;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Status = true;
            user.RegisterDate = id > 0 ? user.RegisterDate : DateTime.Now;
            if (entity.Roles[0] != null)
            {
                List<string> roleList = new List<string>();
                roleList.AddRange(entity.Roles?.SelectMany(c => c.Split(",")).ToList());
                user.UserOperationClaims = roleList.Select(c => new UserOperationClaim
                {
                    OperationClaimsId = int.Parse(c),
                    UserId = user.Id
                }).ToList();
            }
            if (id <= 0)
            {
                var role = _roleService.GetByName("User");
                if (role == null)
                {
                    var newRole = new RoleForAdminPageDto();
                    newRole.Name = "User";
                    _roleService.AddOrUpdateRole(0, newRole);
                    role = _roleService.GetByName("User");
                }
                user.UserOperationClaims.Add(new UserOperationClaim { OperationClaimsId = role.Data.Id, UserId = user.Id });
            }
            _userService.Update(user);
            return new SuccessDataResult<User>(id > 0 ? $"{entity.UserName} {Messages.Updated}" : $"{entity.UserName} {Messages.UserRegistered}");
        }
    }
}
