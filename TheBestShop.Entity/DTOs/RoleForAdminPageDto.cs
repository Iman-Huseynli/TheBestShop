using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;

namespace TheBestShop.Entity.DTOs
{
    public class RoleForAdminPageDto: IDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
