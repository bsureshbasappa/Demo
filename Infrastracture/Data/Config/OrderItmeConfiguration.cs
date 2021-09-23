using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastracture.Data.Config
{
    public class OrderItmeConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.OwnsOne(i=>i.ItemOrdered, io=>{io.WithOwner();});

            builder.Property(i=>i.Price)
                    .HasColumnName("decimal(18,2)");
        }
    }
}