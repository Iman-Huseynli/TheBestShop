using Castle.DynamicProxy;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.CrossCuttingConcerns.FluentValidation;
using TheBestShop.Core.Utilities.Interceptors;

namespace TheBestShop.Core.Aspects.Autofac.Validation
{
    public class ValidationAspect: MethodInterception
    {
        private Type _type;

        public ValidationAspect(Type type)
        {
            if (!typeof(IValidator).IsAssignableFrom(type))
            {
                throw new Exception("Wrong validation type.");
            }
            _type = type;
        }


        protected override void OnBefaore(IInvocation invocation)
        {
            var validator = (IValidator)Activator.CreateInstance(_type);
            var entityType = _type.BaseType.GetGenericArguments()[0];
            var entities = invocation.Arguments.Where(c => c.GetType() == entityType);
            foreach (var item in entities)
            {
                ValidationTool.Validate(validator, item);
            }
        }
    }
}
