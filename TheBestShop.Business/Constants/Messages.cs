using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheBestShop.Business.Constants
{
    public static class Messages
    {
        public static string NameAlreadyExists => "This name is already exists";
        public static string DataGetSuccessfully => "Data got successfully.";
        public static string AuthorizationsDenied => "Authorizations denied";
        public static string UserRegistered => " registered successfully!";
        public static string UserAlreadyExists => "User is already exists.";
        public static string AccessTokenCreated => "AccessTokenCreated";
        public static string OperationClaimExists => "OperationClaimExists";
        public static string Added => " added successfully!";
        public static string Deleted => " deleted successfully!";
        public static string Updated => " updated successfully!";
        public static string UserNotFound => "User can not found. Please check your data and try again.";
        public static string ErrorLogin => "Password or email isn't correct. Please check your data and try again.";
        public static string SuccessfulLogin => " welcome back ";
        public static string OldPasswordIsNotCorrect => " Your old password is not correct...";
        public static string UserPasswordReseted => " Your password changed successfully.";
        public static string AuthenticatorCodeIsNotCorrect => "Code is not correct. Please try again...";
        public static string CodeIsCorrect => "Code is correct.";
        public static string SendResetPasswordSuccessfully => "You should soon receive an email allowing you to reset your password. Please make sure to check your spam and trash if you can't find the email.";
        public static string PasswordResetSuccessfully => "Password reset successfully.";
        public static string PasswordChangeSuccessfully => " password changed successfully.";
        public static string PasswordDidNotMatch => "Your new password does not match confirmation.";
        public static string OrderAdded => "Your order has been confirmed.";
        public static string UnknownError => "There is unknown error. Please try again...";
    }
}
