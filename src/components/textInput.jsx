import { useState } from "react";

const Input = () => {
  const [inputT, setInput] = useState(""); 
  const [outputText, setOutputText] = useState(""); 
  const [inputLanguage, setInputLanguage] = useState("en"); 
  const [outputLanguage, setOutputLanguage] = useState("pt"); 

  async function translate() {
    if (!inputT.trim()) {
      console.warn("O texto de entrada está vazio."); 
      return;
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURIComponent(
      inputT
    )}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }
      const json = await response.json();
      console.log("Resposta da API:", json); 

      if (json && json[0]) {
        const translatedText = json[0].map((item) => item[0]).join(""); 
        setOutputText(translatedText); 
      } else {
        console.error("Resposta inesperada da API:", json);
        setOutputText("Erro ao traduzir");
      }
    } catch (error) {
      console.error("Erro ao buscar tradução:", error);
      setOutputText("Erro ao traduzir");
    }
  }

  return (
    <>
      <div>
        <label>Idioma de entrada:</label>
        <select value={inputLanguage} onChange={(e) => setInputLanguage(e.target.value)}>
          <option value="en">Inglês</option>
          <option value="pt">Português</option>
          <option value="es">Espanhol</option>
        </select>
        <div>
        <textarea
          value={inputT}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite o texto..."
        ></textarea>
        </div>
      </div>

      <div>
        <label>Idioma de saída:</label>
        <select value={outputLanguage} onChange={(e) => setOutputLanguage(e.target.value)}>
          <option value="en">Inglês</option>
          <option value="pt">Português</option>
          <option value="es">Espanhol</option>
        </select>
        <div>
        <textarea value={outputText} readOnly placeholder="Tradução aparecerá aqui..."></textarea>
        </div>
      </div>

      <button onClick={translate}>Traduzir</button>
    </>
  );
};

export default Input;
