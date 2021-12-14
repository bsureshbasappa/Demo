using System;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IResponseCacheService
    {
        Task CacheResponseAsync(string cacheKey, object responce, TimeSpan timeToLive);
        Task<string> GetCacheResponseAsync(string cacheKey);
    }
}