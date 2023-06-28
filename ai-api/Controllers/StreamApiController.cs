using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.StaticFiles;

namespace ai_api.Controllers;

[ApiController]
[Route("/streamapi")]
public class StreamApiController : ControllerBase
{

    private readonly ILogger<StreamApiController> _logger;
    static readonly HttpClient client = new HttpClient();

    public StreamApiController(ILogger<StreamApiController> logger)
    {
        _logger = logger;
    }


    [HttpGet(Name = "/streamapi")]
    public async IAsyncEnumerable<string> Get([EnumeratorCancellation]CancellationToken cancellationToken)
    {
        int index = 0;
        while(!cancellationToken.IsCancellationRequested) {
            await Task.Delay(1000);
            yield return index++.ToString();

        }
    }

    [HttpGet]
    [Route("/video")]
    public async Task<IActionResult> GetVideo()
    {

        var filepath = Path.Combine(Directory.GetCurrentDirectory(),"video.mp4");
        var provider = new FileExtensionContentTypeProvider();

        if(!provider.TryGetContentType(filepath, out var contentType)) {
            contentType = "application/octet-stream";

        }

        var bytes = await System.IO.File.ReadAllBytesAsync(filepath);
        return File(bytes, contentType, Path.GetFileName(filepath));

    }
}
