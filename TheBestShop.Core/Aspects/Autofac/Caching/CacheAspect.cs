using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.CrossCuttingConcerns.Caching;
using Microsoft.Extensions.DependencyInjection;
using TheBestShop.Core.Utilities.Interceptors;
using TheBestShop.Core.Utilities.IoC;
using Castle.DynamicProxy;

namespace TheBestShop.Core.Aspects.Autofac.Caching
{
    public class CacheAspect: MethodInterception
    {
        private int _duration;
        ICacheManager _cacheManager;

        public CacheAspect(int duration = 1)
        {
            _duration = duration;
            _cacheManager = ServiceTool.ServiceProvider.GetService<ICacheManager>();
        }


        public override void Intercept(IInvocation invocation)
        {
            var methodName = string.Format($"{invocation.Method.ReflectedType.FullName}.{invocation.Method.Name}");
            var arguments = invocation.Arguments.ToList();
            var key = $"{methodName}({string.Join(',', arguments.Select(c => c?.ToString() ?? "<Null>"))})";
            if (_cacheManager.IsAdd(key))
            {
                invocation.ReturnValue = _cacheManager.Get(key);
                return;
            }
            invocation.Proceed();
            _cacheManager.Add(key, invocation.ReturnValue, _duration);
        }
    }
}
