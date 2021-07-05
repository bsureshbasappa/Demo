

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message=null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageforStatusCode(StatusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageforStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A Bad request, you made",
                401 => "Authorized, you are not",
                404 => "Resource found, it was not",
                500 => "Errors are path to the dark side. Error lead to anger. Anger leads hate. Hate leads to career change",
                _ =>null           
            };
        }
    }
}