async function confirmSwap(){
  event.preventDefault();
  let apiAddress = "https://latest.currency-api.pages.dev/v1/currencies/"; //if you wondering about securing problem that i leaving the api here. This is free api <3 
  
  let inputCurrency = document.getElementById("inputCurrency").value;
  let outputCurrency = document.getElementById("outputCurrency").value;
  //Get the input number
  let inputNumber = document.getElementById("input-amount").value;

  //Checking if the number is valid
  if(!isNumeric(inputNumber))
  {
      window.alert("not valid number, please kindly type in number only. Gracias!");
      return false;
  }

  if(inputNumber === '' || inputNumber == null){
      window.alert("please type in the amount of currency you want to exchange. Gracias!");
      return false;
  }

  if(inputCurrency === outputCurrency){
      document.getElementById("output-amount").value = document.getElementById("input-amount").value;
      return false;
  }

  //reformat the input currency
  let finalInputCurrency = "";
  let finalOutputCurrency = "";
  switch(inputCurrency){
      case "VND":
          finalInputCurrency = "vnd";
          break;
      case "USD":
          finalInputCurrency = "usd";
          break;
      case "WON":
          finalInputCurrency = "krw";
          break;
      case "YEN":
          finalInputCurrency = "jpy";
          break;
  }

  //reformat the output currency
  switch(outputCurrency){
      case "VND":
          finalOutputCurrency = "vnd";
          break;
      case "USD":
          finalOutputCurrency = "usd";
          break;
      case "WON":
          finalOutputCurrency = "krw";
          break;
      case "YEN":
          finalOutputCurrency = "jpy";
          break;
  }

  //fetch the api
  apiAddress += finalInputCurrency + ".json";
  
  try{
      const response = await fetch(apiAddress);
      if(!response.ok){
          throw new Error("AHIHI");
      }

      const data = await response.json();

      let exchangeRate = data[finalInputCurrency][finalOutputCurrency];

      document.getElementById("output-amount").value = Math.round((inputNumber * exchangeRate) * 1000) / 1000;

      
  }
  catch(error){
      console.error('Error fetching data:', error);
      window.alert('Failed to fetch exchange rate. Please try again later.');
  }

  return false;
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}