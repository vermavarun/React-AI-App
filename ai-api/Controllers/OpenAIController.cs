using Microsoft.AspNetCore.Mvc;
using Azure;
using Azure.AI.OpenAI;
using System.Net;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.Json.Nodes;

namespace ai_api.Controllers;

[ApiController]
[Route("/openai")]
public class OpenAIController : ControllerBase
{

    private readonly ILogger<OpenAIController> _logger;
    static readonly HttpClient client = new HttpClient();

    public OpenAIController(ILogger<OpenAIController> logger)
    {
        _logger = logger;
    }

    [HttpPost(Name = "/openai")]
    public async Task<string> Post(string prompt)
    {
        string url = "https://openaiserviceshasz.openai.azure.com/openai/deployments/gpt-35-turbo-deployment/chat/completions?api-version=2023-03-15-preview";

        var openAIBody = new OpenAIBody();

        var message = new OpenAIMessage();
        message.role = "user";
        message.content = prompt;

        var messages = new List<OpenAIMessage>();
        messages.Add(message);

        openAIBody.messages = messages;

        var json = Newtonsoft.Json.JsonConvert.SerializeObject(openAIBody);


        var reqBody = new StringContent(json.ToString(), UnicodeEncoding.UTF8, "application/json"); // use MediaTypeNames.Application.Json in Core 3.0+ and Standard 2.1+
        client.DefaultRequestHeaders.Add("api-key", "");
        using HttpResponseMessage response = await client.PostAsync(url,reqBody);
        //response.EnsureSuccessStatusCode();
        dynamic responseBody = await response.Content.ReadAsStringAsync();

        // dynamic obj = JsonConvert.DeserializeObject<dynamic>(responseBody);
        // return obj.choices.message.content;
        JObject s = JObject.Parse(responseBody);
        return s["choices"]?[0]["message"]["content"].ToString();
    }
}

internal class OpenAIBody
{
  public List<OpenAIMessage>? messages { get; set; }
}

public class OpenAIMessage
    {
        public string? role { get; set; }
        public string? content { get; set; }
    }