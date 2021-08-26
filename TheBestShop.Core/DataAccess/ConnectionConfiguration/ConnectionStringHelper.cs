using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace TheBestShop.Core.DataAccess.ConnectionConfiguration
{
    public class ConnectionStringHelper
    {
        public static string ConfigurationFileName { get; set; } = "appsettings.json";

        public static string GetConnectionString()
        {
            return ConfigurationMainBuilderRoot().GetConnectionString(InitOptions<Entity.Environment>("Environment").Production ? "ProductionConnection" : "DevelopmentConnection");
        }

        private static IConfigurationRoot ConfigurationMainBuilderRoot()
        {
            var builder = new ConfigurationBuilder();
            builder.AddJsonFile(ConfigurationFileName, optional: false);
            return builder.Build();
        }

        private static T InitOptions<T>(string section)
            where T: class, new()
        {
            var config = InitMainConfiguration();
            return config.GetSection(section).Get<T>();
        }

        private static IConfigurationRoot InitMainConfiguration()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(ConfigurationFileName);
            return builder.Build();
        }
    }
}
