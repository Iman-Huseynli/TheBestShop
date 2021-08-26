using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;

namespace TheBestShop.Entity.DTOs
{
    public class AdminPageDto<T>: IDto
    {
        public List<T> Data { get; set; }
        public int Count { get; set; }
        public int PaginationCount { get; set; }
    }
}
