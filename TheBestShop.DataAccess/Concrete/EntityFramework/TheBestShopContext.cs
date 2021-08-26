using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.DataAccess.ConnectionConfiguration;
using TheBestShop.Core.Entities.Concrete;
using TheBestShop.Entity.Concrete;

namespace TheBestShop.DataAccess.Concrete.EntityFramework
{
    public class TheBestShopContext: DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectionStringHelper.GetConnectionString());
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductCategories>().HasKey(c => new { c.CategoryId, c.ProductId});
            modelBuilder.Entity<ProductCategories>().HasOne<Product>(c => c.Product).WithMany(c => c.ProductsCategories).HasForeignKey(c => c.ProductId);
            modelBuilder.Entity<ProductCategories>().HasOne<Category>(c => c.Category).WithMany(c => c.ProductsCategories).HasForeignKey(c => c.CategoryId);
            modelBuilder.Entity<OrderItem>().HasOne<Product>(c => c.Product).WithMany(c => c.OrderItems).HasForeignKey(c => c.ProductId);
            modelBuilder.Entity<OrderItem>().HasOne<Order>(c => c.Order).WithMany(c => c.OrderItems).HasForeignKey(c => c.OrderId);
            modelBuilder.Entity<CartItem>().HasOne<Product>(c => c.Product).WithMany(c => c.CartItems).HasForeignKey(c => c.ProductId);
            modelBuilder.Entity<CartItem>().HasOne<Cart>(c => c.Cart).WithMany(c => c.CartItems).HasForeignKey(c => c.CartId);

            modelBuilder.Entity<UserOperationClaim>().HasKey(c => new { c.OperationClaimsId, c.UserId });
            modelBuilder.Entity<UserOperationClaim>().HasOne<OperationClaim>(c => c.OperationClaim).WithMany(c => c.UserOperationClaims).HasForeignKey(c => c.OperationClaimsId);
            modelBuilder.Entity<UserOperationClaim>().HasOne<User>(c => c.User).WithMany(c => c.UserOperationClaims).HasForeignKey(c => c.UserId);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategories> ProductCategories { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<OperationClaim> OperationClaims { get; set; }
        public DbSet<UserOperationClaim> UserOperationClaims { get; set; }
    }
}
