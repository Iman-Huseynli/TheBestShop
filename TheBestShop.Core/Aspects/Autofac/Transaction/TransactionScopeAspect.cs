using Castle.DynamicProxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using TheBestShop.Core.Utilities.Interceptors;

namespace TheBestShop.Core.Aspects.Autofac.Transaction
{
    public class TransactionScopeAspect: MethodInterception
    {
        public override void Intercept(IInvocation invocation)
        {
            using (var scope = new TransactionScope())
            {
                try
                {
                    invocation.Proceed();
                    scope.Complete();
                }
                catch (Exception)
                {
                    scope.Dispose();
                    throw;
                }
            }
        }
    }
}
