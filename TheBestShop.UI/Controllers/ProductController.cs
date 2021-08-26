using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheBestShop.Business.Abstract;

namespace TheBestShop.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var featuredProducts = _productService.GetFeaturedProducts();
            var bestPriceProducts = _productService.GetBestPriceProducts();
            var mostViewed = _productService.GetMostViewed();
            var bestSelling = _productService.GetBestSelling();
            var result = new
            {
                featuredProducts = featuredProducts.Data,
                bestPrice = bestPriceProducts.Data,
                mostViewed = mostViewed.Data,
                bestSelling = bestSelling.Data,
                isSuccess = bestSelling.IsSuccess,
                message = bestSelling.Message
            };
            return Ok(result);
        }

        [HttpGet("getallwithpagination")]
        public IActionResult GetAllWithPagination([FromQuery] int pageNumber, [FromQuery] int pageSize, [FromQuery] int minPrice, [FromQuery] int maxPrice, [FromQuery] int selectedCategory, [FromQuery] string selectedCompany, [FromQuery] int reviewFilter, [FromQuery] string searchValue, [FromQuery] int sortData)
        {
            var result = _productService.GetProductsWithPagination(minPrice, maxPrice, selectedCategory, selectedCompany, reviewFilter, searchValue, pageNumber, pageSize, sortData);
            return Ok(result);
        }

        [HttpGet("getallcompany")]
        public IActionResult GetAllCompany()
        {
            var result = _productService.GetAllCompany();
            return Ok(result);
        }

        [HttpGet("getproduct")]
        public IActionResult GetProduct([FromQuery] int id)
        {
            var detailFeatured = _productService.GetMostViewed();
            var product = _productService.Get(id);
            var result = new
            {
                data = product.Data,
                detailFeatured = detailFeatured.Data,
                isSuccess = product.IsSuccess,
                message = product.Message
            };
            return Ok(result);
        }

        [HttpGet("getproductwithcategories")]
        public IActionResult GetProductWithCategories([FromQuery] int id)
        {
            var result = _productService.GetProductWithCategories(id);
            return Ok(result);
        }
    }
}
