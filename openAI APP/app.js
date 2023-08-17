const API_KEY = "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";
const btn = document.querySelector(".btn");
const question = document.querySelector(".question"); 
const loadingElement = document.querySelector(".loading");


async function fetchData() {
    loadingElement.style.display = "block";
   try { const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: "Generate a deep, romantic or a thought-provoking question to ask your partner to get to know him better.",
            max_tokens: 1000,

        })
    }); 
        const data = await response.json()
        loadingElement.style.display = "none";
        question.innerText = data.choices[0].text
    }
   catch {
    
    console.error("Error fetching data:", error);
        // Hide loading symbol even if an error occurs
        loadingElement.style.display = "block";}
 
  
}

window.addEventListener('load', fetchData);
 btn.addEventListener('click', fetchData);

