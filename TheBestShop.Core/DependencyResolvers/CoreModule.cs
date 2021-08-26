using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using NigroCandle.Core.Utilities.Mail;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.CrossCuttingConcerns.Caching;
using TheBestShop.Core.CrossCuttingConcerns.Caching.Microsoft;
using TheBestShop.Core.Utilities.IoC;

namespace TheBestShop.Core.DependencyResolvers
{
    public class CoreModule : ICoreModule
    {
        public void Load(IServiceCollection services)
        {
            services.AddMemoryCache();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IMailService, MailManager>();
            services.AddSingleton<ICacheManager, MemoryCacheManager>();
            services.AddSingleton<Stopwatch>();
        }
    }
}
