# Copilot Plugin

This plugin allows you to use Copilot in your app.

LocalStorage is used to store the model and the api key.

Set them before using the plugin.

```typescript
window.localStorage.setItem('openai-api-url', 'https://api.openai.com/v1/completions');
window.localStorage.setItem('openai-api-token', 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
window.localStorage.setItem('openai-api-config', '{"model":"davinci-002","max_tokens":7,"temperature":0,"top_p":1,"n":1,"stream":false,"logprobs":null}');
```
