using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;

namespace TheBestShop.Entity.DTOs
{
    public class CompanyDto: IDto
    {
        public string Name { get; set; }
        public bool Checked { get; set; }
    }
}
