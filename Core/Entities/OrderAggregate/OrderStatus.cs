using System.Runtime.Serialization;

namespace Core.Entities.OrderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value="Pending")]
        Pending,

        [EnumMember(Value="Payment Recived")]
        PaymentRecevied,

        [EnumMember(Value="Payment Failed")]
        PymentFailed

    }
}