(function () {

  const axios = require('axios')
  const { caching_axios_expiring } = require('../cache')
  const { openai_api } = require('../settings')

  const serverUrl = 'https://api.openai.com/v1'
  
  const defaultModel = "davinci"

  const gen_headers = (key) => ({
    headers: {
      'Authorization': `Bearer ${key}`, 
      'Content-Type': 'application/json',
    } 
  })

  const onNoKeysFound = () => {
    console.log("No OpenAI api keys found, run settings.")
  }

  // --- events -----------------------------------
  const models = (onData, onError) => {

    const onApiKeysFound = (keys) => {
      const headers = gen_headers(keys.key)
      const command = `${serverUrl}/models`
     
      console.log("models: ", command)
      axios.get(command, headers)
        .then((response) => {
          console.log("models response", response)
          onData(response.data.data)
        })
        .catch((err) => {
          console.error("ERROR", err)
          onError(err.message)
        })
    }

    openai_api(onApiKeysFound, onNoKeysFound)
  }

  const model_ids = (onData, onError) => {
    models((data) => {

      const ids = data.map((o) => o.id)
      onData(ids)
    }, onError)
  }

  
  const completions = (params, onData, onError) => {
    const onApiKeysFound = (keys) => {
      const headers = gen_headers(keys.key)
      const command = `${serverUrl}/completions`
     
      console.log("completions: ", command, params)
      axios.post(command, params, headers)
        .then((response) => {
          console.log("completions response", response)
          onData(response.data.choices[0].text)
        })
        .catch((err) => {
          console.error("ERROR", err)
          onError(err.message)
        })
    }

    openai_api(onApiKeysFound, onNoKeysFound)
  }

  const simpleCompletion = (prompt, config, onData, onError) => {
    
    const oConfig = !config ? {} : config

    const o = {
      model: defaultModel,
      prompt
    }

    Object.keys(config).forEach(x => {
      o[x] = oConfig[x]
    });

    completions(o, onData, onError)

  } 


  // ----------------------------------------------------------------------------------------
  //    exports
  // ----------------------------------------------------------------------------------------
  
  exports.models = models
  exports.model_ids = model_ids
  exports.completions = completions
  exports.simpleCompletion = simpleCompletion

}).call(this);