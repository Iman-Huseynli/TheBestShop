using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheBestShop.Business.Abstract;
using TheBestShop.Core.Extensions;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        IAdminService _adminService;
        IProductService _productService;
        ICategoryService _categoryService;
        IAuthService _authService;
        IRoleService _roleService;

        public AdminController(IAdminService adminService, IProductService productService, ICategoryService categoryService, IAuthService authService, IRoleService roleService)
        {
            _adminService = adminService;
            _productService = productService;
            _categoryService = categoryService;
            _authService = authService;
            _roleService = roleService;
        }


        [HttpGet("getalldata")]
        public IActionResult GetAllData([FromQuery] string tableName, [FromQuery] string searchValue, [FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            var result = _adminService.GetAllData(tableName, searchValue, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpPost("addorupdateproduct")]
        public IActionResult AddOrUpdateProduct([FromQuery] int id, [FromForm] AddingProductDto data)
        {
            string userName = User.ClaimUserName();
            var result = _productService.AddOrUpdateProduct(id, data, userName);
            return Ok(result);
        }

        [HttpGet("removeproduct")]
        public IActionResult RemoveProduct([FromQuery] int id)
        {
            var userName = User.ClaimRoles();
            var result = _productService.Delete(id);
            return Ok(result);
        }

        [HttpPost("addorupdatecategory")]
        public IActionResult AddOrUpdateCategory([FromQuery] int id, [FromForm] AddingCategoryDto data)
        {
            string userName = User.ClaimUserName();
            var result = _categoryService.AddOrUpdateCategory(id, data, userName);
            return Ok(result);
        }

        [HttpGet("removecategory")]
        public IActionResult RemoveCategory([FromQuery] int id)
        {
            var result = _categoryService.Delete(id);
            return Ok(result);
        }

        [HttpPost("addorupdateuser")]
        public IActionResult AddOrUpdateUser([FromQuery] int id, [FromForm] AddOrUpdateUserDto data)
        {
            if (id <= 0)
            {
                var userExists = _authService.UserExists(data.Email);
                if (!userExists.IsSuccess) return Ok(userExists);
            }
            var result = _authService.AddOrUpdateUser(id, data);
            return Ok(result);
        }
        
        [HttpGet("removeuser")]
        public IActionResult RemoveUser([FromQuery] int id)
        {
            var result = _authService.Delete(id);
            return Ok(result);
        }

        [HttpGet("getroles")]
        public IActionResult GetRoles()
        {
            var result = _roleService.GetAll();
            return Ok(result);
        }

        [HttpGet("getrolebyid")]
        public IActionResult GetRoleById([FromQuery] int id)
        {
            var result = _roleService.GetById(id);
            return Ok(result);
        }

        [HttpPost("addorupdaterole")]
        public IActionResult AddOrUpdateRole([FromQuery] int id, [FromForm] RoleForAdminPageDto data)
        {
            var result = _roleService.AddOrUpdateRole(id, data);
            return Ok(result);
        }

        [HttpGet("removerole")]
        public IActionResult RemoveRole([FromQuery] int id)
        {
            var result = _roleService.Delete(id);
            return Ok(result);
        }


    }
}
