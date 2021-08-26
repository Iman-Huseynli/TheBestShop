using NigroCandle.Entity.DTOs;
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
using TheBestShop.Core.Utilities.Securiy.Hashing;
using TheBestShop.DataAccess.Abstract;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.Concrete
{
    public class UserManager : IUserService
    {
        IUserDal _userDal;
        ICartItemDal _cartItemDal;
        ICartDal _cartDal;

        public UserManager(IUserDal userDal, ICartItemDal cartItemDal, ICartDal cartDal)
        {
            _userDal = userDal;
            _cartItemDal = cartItemDal;
            _cartDal = cartDal;
        }


        public IResult Add(User entity)
        {
            _userDal.Create(entity);
            return new SuccessResult();
        }

        public bool AddUserToOperation(string operationName, int userId)
        {
            return _userDal.AddUserToOperation(operationName, userId);
        }

        [SecuredOperation("User")]
        public IResult ChangePassword(ChangeUserDataDto entity)
        {
            var userToCheck = _userDal.Get(c => c.Id == entity.Id);
            if (userToCheck == null) return new ErrorDataResult<ChangeUserDataDto>(Messages.UserNotFound);

            if (!HashingHelper.VerifyPasswordHash(entity.Password, userToCheck.PasswordHash, userToCheck.PasswordSalt))
            {
                throw new Exception(Messages.OldPasswordIsNotCorrect);
            }

            if(entity.NewPassword != entity.ReNewPassword) return new ErrorDataResult<ChangeUserDataDto>(Messages.PasswordDidNotMatch);
            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(entity.NewPassword, out passwordHash, out passwordSalt);

            userToCheck.Id = userToCheck.Id;
            userToCheck.PasswordHash = passwordHash;
            userToCheck.PasswordSalt = passwordSalt;
            _userDal.Update(userToCheck);
            return new SuccessResult($"{userToCheck.UserName}{Messages.PasswordChangeSuccessfully}");
        }

        [SecuredOperation("User")]
        public IResult ChangeUserData(ChangeUserDataDto entity)
        {
            var userToCheck = _userDal.Get(c => c.Id == entity.Id);
            if (userToCheck == null) return new ErrorDataResult<ChangeUserDataDto>(Messages.UserNotFound);
            userToCheck.FirstName = entity.FirstName;
            userToCheck.LastName = entity.LastName;
            userToCheck.UserName = entity.UserName;
            _userDal.Update(userToCheck);
            return new SuccessResult($"{userToCheck.UserName}{Messages.Updated}");
        }

        [SecuredOperation("User")]
        public IResult CloseAccount(int id)
        {
            var userToCheck = _userDal.Get(c => c.Id == id);
            if (userToCheck == null) return new ErrorResult(Messages.UserNotFound);
            _userDal.Delete(userToCheck);
            var cart = _cartDal.Get(c => c.UserId == id);
            _cartDal.Delete(cart);
            return new SuccessResult();
        }

        public IResult Delete(User entity)
        {
            _userDal.Delete(entity);
            return new SuccessResult();
        }

        public IDataResult<User> GetById(int id)
        {
            var data = _userDal.Get(c => c.Id == id);
            return new SuccessDataResult<User>(data, Messages.DataGetSuccessfully);
        }

        public User GetByMail(string email)
        {
            return _userDal.Get(c => c.Email == email);
        }

        public List<OperationClaim> GetClaims(User user)
        {
            return _userDal.GetClaims(user);
        }

        public IDataResult<ChangeUserDataDto> GetUserData(int userId)
        {
            var userToCheck = _userDal.Get(c => c.Id == userId);
            if (userToCheck == null) return new ErrorDataResult<ChangeUserDataDto>(Messages.UserNotFound);
            ChangeUserDataDto user = new ChangeUserDataDto();
            user.Id = userToCheck.Id;
            user.UserName = userToCheck.UserName;
            user.FirstName = userToCheck.FirstName;
            user.LastName = userToCheck.LastName;
            user.Email = userToCheck.Email;
            return new SuccessDataResult<ChangeUserDataDto>(user);
        }

        public IDataResult<GetUserWithRolesDto> GetUserWithRoles(int id)
        {
            var data = _userDal.GetUserWithRoles(id);
            if (data == null) return new ErrorDataResult<GetUserWithRolesDto>(Messages.UserNotFound);
            GetUserWithRolesDto user = new GetUserWithRolesDto();
            user.Id = data.Id;
            user.Email = data.Email;
            user.UserName = data.UserName;
            user.FirstName = data.FirstName;
            user.LastName = data.LastName;
            user.Status = data.Status;
            user.RegisterDate = data.RegisterDate;
            user.UserOperationClaims = data.UserOperationClaims;
            return new SuccessDataResult<GetUserWithRolesDto>(user, Messages.DataGetSuccessfully);
        }

        public IResult Update(User entity)
        {
            _userDal.Update(entity);
            return new SuccessResult();
        }
    }
}

