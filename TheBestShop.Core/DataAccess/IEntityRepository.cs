using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;

namespace TheBestShop.Core.DataAccess
{
    public interface IEntityRepository<T>
        where T: class, IEntity, new()
    {
        List<T> GetAll(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderby = null);
        T Get(Expression<Func<T, bool>> filter);
        int Count(Expression<Func<T, bool>> filter = null);
        List<T> Pagination(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderby = null, int pageNumber = 1, int pageSize = 10);
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
        void AddRange(List<T> entities);
        void RemoveRange(List<T> entities);
    }
}
