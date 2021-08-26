using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NigroCandle.Entity.DTOs;
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
    public class AuthController : ControllerBase
    {
        IAuthService _authService;
        IUserService _userService;

        public AuthController(IAuthService authService, IUserService userService)
        {
            _authService = authService;
            _userService = userService;
        }


        [HttpPost("login")]
        public IActionResult Login([FromForm] UserForLoginDto userForLoginDto)
        {
            var loginResult = _authService.Login(userForLoginDto);
            if (!loginResult.IsSuccess)
            {
                return Ok(loginResult);
            }
            var result = _authService.CreateAccessToken(loginResult.Data);
            return Ok(result);
        }

        [HttpPost("register")]
        public IActionResult Register([FromForm] UserForRegisterDto user)
        {
            var userExists = _authService.UserExists(user.Email);
            if (!userExists.IsSuccess)
            {
                return Ok(userExists);
            }

            var result = _authService.Register(user);
            return Ok(result);
        }

        [HttpGet("getuserdata")]
        public IActionResult ChangeUserData()
        {
            int userId = Convert.ToInt32(User.ClaimId());
            var result = _userService.GetUserData(userId);
            return Ok(result);
        }

        [HttpPost("changeuserdata")]
        public IActionResult ChangeUserData([FromForm] ChangeUserDataDto user)
        {
            var result = _userService.ChangeUserData(user);
            return Ok(result);
        }

        [HttpPost("changepassword")]
        public IActionResult ChangePassword([FromForm] ChangeUserDataDto user)
        {
            var result = _userService.ChangePassword(user);
            return Ok(result);
        }

        [HttpGet("removeuser")]
        public IActionResult RemoveUser([FromQuery] int id)
        {
            var result = _userService.CloseAccount(id);
            return Ok(result);
        }

        [HttpGet("getuserbyidwithroles")]
        public IActionResult GetUserWithRoles([FromQuery] int id)
        {
            var result = _userService.GetUserWithRoles(id);
            return Ok(result);
        }

        [HttpGet("checkisauth")]
        public IActionResult CheckIsAuth()
        {
            var result = _authService.CheckIsAuth();
            return Ok(result);
        }

        [HttpGet("checkisadmin")]
        public IActionResult CheckIsAdmin()
        {
            var result = _authService.CheckIsAdmin();
            return Ok(result);
        }
    }
}
