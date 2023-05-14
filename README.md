# Langchain Showcase

## Description 

This repository serves mainly as a playground and showcase of [Langchain](https://docs.langchain.com/docs/) features and APIs.

Current list of showcased features:
* few-shot learning with model acting as a american western hostel-owning cowboy (with templates)
* call basic model
* call model acting as a american western hostel-owning cowboy
* action agent (with memory)
* plan-and-execute agent (with memory)

## Usage

1. Run `npm i`

2. Create `.env` file and insert environment variables
```env
OPENAI_API_KEY=your-open-api-key
HUGGINGFACEHUB_API_KEY=your-hugging-face-api-key
COHERE_API_KEY=your-cohere-api-key
REPLICATE_API_KEY=your-replicate-api-key
SERPAPI_API_KEY=your-serpapi-api-key

VERBOSE=true # optional - turns on more verbose mode
USER_PROMPT="Who are you?" # optional - injects prompt for call methods or few-shot learning. Can be also done by running start/watch commands
```
3. Run script
```zsh
npm run start
```

For verbose mode, run
```zsh
npm run start:verbose
```

Alternatively, if you want to run watch mode, just replace `start` with `watch`