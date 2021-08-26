using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.DataAccess.EntityFramework;
using TheBestShop.Core.Entities.Concrete;
using TheBestShop.DataAccess.Abstract;

namespace TheBestShop.DataAccess.Concrete.EntityFramework
{
    public class EfCoreUserDal : EfRepositoryBase<User, TheBestShopContext>, IUserDal
    {
        public bool AddUserToOperation(string operationName, int userId)
        {
            using (var context = new TheBestShopContext())
            {
                var result = context.OperationClaims.Where(c => c.Name == operationName).FirstOrDefault();
                if (result != null)
                {
                    context.UserOperationClaims.Add(new UserOperationClaim
                    {
                        OperationClaimsId = result.Id,
                        UserId = userId
                    });
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        public List<OperationClaim> GetClaims(User user)
        {
            using (var context = new TheBestShopContext())
            {
                var result = from oc in context.OperationClaims
                             join uoc in context.UserOperationClaims
                             on oc.Id equals uoc.OperationClaimsId
                             where uoc.UserId == user.Id
                             select new OperationClaim
                             {
                                 Id = oc.Id,
                                 Name = oc.Name
                             };
                return result.ToList();
            }
        }

        public User GetUserWithRoles(int id)
        {
            using (var context = new TheBestShopContext())
            {
                return context.Users.Include(c => c.UserOperationClaims).ThenInclude(c => c.OperationClaim).Where(c => c.UserOperationClaims.Any(x => x.UserId == id)).FirstOrDefault();
            }
        }

        public override void Update(User entity)
        {
            using (var context = new TheBestShopContext())
            {
                var temp = context.UserOperationClaims.Where(c => c.UserId == entity.Id).ToList();
                if (temp.Count > 0) context.Set<UserOperationClaim>().RemoveRange(temp);
                context.Set<UserOperationClaim>().AddRange(entity.UserOperationClaims);
                context.Users.Update(entity);
                context.SaveChanges();
            }
        }
    }
}
