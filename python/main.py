import os
import openai
openai.api_type = "azure"
openai.api_base = "https://openaiserviceshasz.openai.azure.com/"
openai.api_version = "2023-03-15-preview"
openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.ChatCompletion.create(
  engine="gpt-35-turbo-deployment",
  messages = [{"role":"user","content":"Hi"}],
  temperature=0,
  max_tokens=800,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0,
  stop=None)
print(response)