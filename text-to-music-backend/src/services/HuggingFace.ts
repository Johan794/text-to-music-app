import { prompt } from "../types/promptType"

/**
 *
 * @param data data to send to the model, prompt
 * @param apiKey the api key to use to query the model
 * @returns the audio file generated by the model
 */
async function query(data: prompt, apiKey: string) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/musicgen-small",
    {
      headers: { Authorization: "Bearer " + apiKey },
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  const result = await response.blob()
  return result
}

export { query }
