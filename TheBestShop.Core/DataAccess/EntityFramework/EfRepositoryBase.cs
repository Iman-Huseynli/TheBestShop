using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;

namespace TheBestShop.Core.DataAccess.EntityFramework
{
    public class EfRepositoryBase<TEntity, TContext> : IEntityRepository<TEntity>
        where TEntity: class, IEntity, new()
        where TContext: DbContext, new()
    {
        public void AddRange(List<TEntity> entities)
        {
            using (var context = new TContext())
            {
                context.Set<TEntity>().UpdateRange(entities);
                context.SaveChanges();
            }
        }

        public int Count(Expression<Func<TEntity, bool>> filter = null)
        {
            using (var context = new TContext())
            {
                return filter == null ? context.Set<TEntity>().ToList().Count : context.Set<TEntity>().Where(filter).ToList().Count;
            }
        }

        public void Create(TEntity entity)
        {
            using (var context = new TContext())
            {
                context.Entry(entity).State = EntityState.Added;
                context.SaveChanges();
            }
        }

        public void Delete(TEntity entity)
        {
            using (var context = new TContext())
            {
                context.Entry(entity).State = EntityState.Deleted;
                context.SaveChanges();
            }
        }

        public TEntity Get(Expression<Func<TEntity, bool>> filter)
        {
            using (var context = new TContext())
            {
                return context.Set<TEntity>().Where(filter).FirstOrDefault();
            }
        }

        public List<TEntity> GetAll(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderby = null)
        {
            using (var context = new TContext())
            {
                return filter == null ?
                           orderby == null ?
                            context.Set<TEntity>().ToList() :
                            orderby(context.Set<TEntity>()).ToList() :
                         orderby == null ?
                            context.Set<TEntity>().Where(filter).ToList() :
                            orderby(context.Set<TEntity>()).Where(filter).ToList();
            }
        }

        public List<TEntity> Pagination(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderby = null, int pageNumber = 1, int pageSize = 10)
        {
            using (var context = new TContext())
            {
                return filter == null ?
                           orderby == null ?
                               context.Set<TEntity>().Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList() :
                               orderby(context.Set<TEntity>()).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList() :
                           orderby == null ?
                               context.Set<TEntity>().Where(filter).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList() :
                               orderby(context.Set<TEntity>()).Where(filter).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            }
        }

        public void RemoveRange(List<TEntity> entities)
        {
            using (var context = new TContext())
            {
                context.Set<TEntity>().RemoveRange(entities);
                context.SaveChanges();
            }
        }

        public virtual void Update(TEntity entity)
        {
            using (var context = new TContext())
            {
                context.Update(entity);
                context.SaveChanges();
            }
        }
    }
}
