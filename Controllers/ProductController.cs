using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using productpage.model;

namespace productpage.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ApiSettings _apiSettings;

    private readonly ILogger<ProductController> _logger;

    public ProductController(ILogger<ProductController> logger, IOptions<ApiSettings> apiSettings)
    {
        _logger = logger;
        _apiSettings = apiSettings.Value;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Product>))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get()
    {
        var apiUrl = $"{_apiSettings.Url}/api/products";
        IEnumerable<Product> products;

        using (var client = new HttpClient())
        {
            var request = new HttpRequestMessage(HttpMethod.Get, apiUrl);
            request.Headers.Add("Accept", "text/plain");
            request.Headers.Add(_apiSettings.KeyHeader, _apiSettings.Key);

            var response = await client.SendAsync(request);

            try
            {
                response.EnsureSuccessStatusCode();

                // Handle success
                var productJsonString = await response.Content.ReadAsStringAsync();
                products = JsonConvert.DeserializeObject<IEnumerable<Product>>(productJsonString);
            }
            catch (HttpRequestException)
            {
                // Handle failure
                products = null;
            }

            return products == null ? NotFound() : Ok(products);
        }
    }
}
