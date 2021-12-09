using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastracture.Services
{
    public class ResponseCacheServices : IResponseCacheService
    {
        private readonly  IDatabase _database;

        public ResponseCacheServices(IConnectionMultiplexer redis)
        {
            _database=redis.GetDatabase();
        }

        public async Task CacheResponseAsync(string cacheKey, object responce, TimeSpan timeToLive)
        {
            if(responce==null)
            {
                return;
            }

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var serialiseResponse = JsonSerializer.Serialize(responce, options);

            await _database.StringSetAsync(cacheKey, serialiseResponse, timeToLive);
        }

        public async Task<string> GetCacheResponseAsync(string cacheKey)
        {
            var CachedResponse = await _database.StringGetAsync(cacheKey);

            if (CachedResponse.IsNullOrEmpty)
            {
                return null;
            }

            return CachedResponse;
        }
    }
}