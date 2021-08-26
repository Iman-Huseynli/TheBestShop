using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace TheBestShop.Core.Extensions
{
    public static class PredicateBuilder
    {
        public static Expression<Func<T, bool>> Get<T>() { return null; }

        public static Expression<Func<T, bool>> Get<T>(this Expression<Func<T, bool>> predicate)
        {
            return predicate;
        }

        public static Expression<Func<T, bool>> Or<T>(this Expression<Func<T, bool>> expr, Expression<Func<T, bool>> or)
        {
            if (expr == null) return or;
            Replace(or, or.Parameters[0], expr.Parameters[0]);
            return Expression.Lambda<Func<T, bool>>(Expression.Or(expr.Body, or.Body), expr.Parameters);
        }

        private static void Replace(object instance, object old, object replacement)
        {
            for (Type t = instance.GetType(); t != null; t = t.BaseType)
                foreach (FieldInfo fi in t.GetFields(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance))
                {
                    object val = fi.GetValue(instance);
                    if (val != null && val.GetType().Assembly == typeof(Expression).Assembly)
                        if (object.ReferenceEquals(val, old))
                            fi.SetValue(instance, replacement);
                        else
                            Replace(val, old, replacement);
                }
        }
    }
}
