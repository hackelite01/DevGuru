// This is an example of to protect an API route
import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import rateLimit from "../../../utils/rate-limit"
import { env } from "process"
import { MongoClient } from "mongodb"
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}
const client = new MongoClient(process.env.MONGO_URI!)

interface Userpromt {
  input: string
  output: string
  createdAt: string
}

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})
//test
const { Configuration, OpenAIApi } = require("openai")

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  let openai = new OpenAIApi(configuration)

  await limiter.check(res, 20, "CACHE_TOKEN") // 8 requests per minute

  const session = await getSession({ req })

  //console.log(req.body)
  //console.log(req.body.textup)
  //console.log(req.body.selectedOption.value)

  console.log(session)

  console.log("content length", req.body.textup.length)
  if (req.body.textup.length > 1000) {
    res.status(400).json({
      message: "Please under 1000 chars",
    })
    return
  }

  openai
    .createCompletion({
      model: "content-filter-alpha",
      //text-davinci-002,
      prompt: "<|endoftext|>" + req.body.textup + "\n--\nLabel:",
      temperature: 0,
      max_tokens: 1,
      top_p: 0,
      logprobs: 10,
    })
    .then(function (response: any) {
      console.log("content-filter score:", response.data.choices[0].text)
      if (response.data.choices[0].text === "0") {
        console.log("safe contnet")

        console.log("usermail:", session?.user?.email)

        configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY_CODEX,
        })
        openai = new OpenAIApi(configuration)

        // add sending user id to the request
        openai
          .createCompletion({
            model: "code-davinci-002",
            prompt:
              "Regex: " +
              req.body.textup +
              "\n\n" +
              "Plain english Explanation of Regex: ",
            temperature: 0.6,
            max_tokens: 250,
            top_p: 1,
            frequency_penalty: 0.1,
            presence_penalty: 0.2,
            user: session?.user?.email,
          })
          .then(async (response: any) => {
            console.log(response.data.choices[0].text)
            //res.status(200).json(response.data)
            console.log("Response:", response.data.choices[0])
            try {
              res.status(200).json({ data: response.data.choices[0].text })
            } catch (err) {
              console.log(err)
            }
          })
          .catch((error: any) => {
            console.log(error)
            res.status(500).json(error.message)
          })
      } else {
        res.status(400).json({
          message: "Please under 1000 chars",
        })
      }
    })
}
