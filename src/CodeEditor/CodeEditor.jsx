import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CodeEditor.css";
import MultiFileUploader from "../FileUploader/MultiFileUploader";
import SpreadSheet from "../SpreadSheet/SpreadSheet";
import { IoCloseCircle } from "react-icons/io5";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [instruction, setInstruction] = useState("");
  const [spreadSheetData, setSpreadSheetData] = useState([]);
  const [show, setShow] = useState(true);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const sendCodeToServer = () => {
    axios
      .post("http://localhost:5000/save-code", { code })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending code to server:", error);
      });
  };

  const recieveCodeFromServer = async () => {
    try {
      const response = await axios.get("http://localhost:5000/send-code");
      setCode(code + response.data.convertedCode);
    } catch (error) {
      console.error("Error fetching analysis:", error);
    }
  };

  const fetchDataAnalysis = async () => {
    axios
      .post("http://localhost:5000/process-python-code", { code })
      .then((response) => {
        console.log(response.data);
        setSpreadSheetData(response.data.data);
        setAnalysisResult(response.data.output);
      })
      .catch((error) => {
        console.error("Error sending code to server:", error);
      });
  };

  const OpenNotebook = async () => {
    try {
      const response = await axios.post("http://localhost:5000/openNotebook", {
        code,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching analysis:", error);
    }
  };

  const genAi = () => {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/code_generation",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2RjZTMxOWYtZmM3ZS00MDY4LWE3MjYtNjdkNDMzNjk0NjJhIiwidHlwZSI6ImFwaV90b2tlbiJ9.VontNv6deTpuF1eFbxXXooeN3w26HxN5TL67O5crRL8",
      },
      data: {
        providers: "openai",
        prompt: "",
        instruction: instruction,
        temperature: 0.1,
        max_tokens: 500,
        fallback_providers: "",
      },
    };

    axios
      .request(options)
      .then((response) => {
        setCode(code + response.data.openai.generated_text);
      })
      .catch((error) => {
        console.error(error);
      });
    setInstruction("");
  };

  const handleInstruction = (e) => {
    setInstruction(e.target.value);
  };

  const handleFilePaths = (filePaths) => {
    let rawCode = "import pandas as pd\n\n";
    filePaths.forEach((file, index) => {
      rawCode += `df${index} = pd.read_excel(r'${file.path}')\n`;
    });
    setCode(code + rawCode);
  };

  const closeHandler = () => {
    setShow(false);
  };

  useEffect(() => {
    const fetchFolderPath = async () => {
      try {
        const response = await axios.get("http://localhost:5000/folderPath");
        const folderPath = response.data.folderPath;
        const rawCode = `#df.to_csv(r'${folderPath}\\output.csv', index=False)\n#df.to_excel(r'${folderPath}\\output.xlsx', index=False)\n#df.to_json(r'${folderPath}\\output.json', orient='records')\n\n`;
        setCode(rawCode);
      } catch (error) {
        console.error("Error fetching analysis:", error);
      }
    };
    fetchFolderPath();
  }, []);
  return (
    <div className="container">
      <div className="spreadsheet">
        <SpreadSheet data={spreadSheetData} />
      </div>
      <div
        className="codebox"
        style={show ? { display: "block" } : { display: "none" }}
      >
        <button onClick={OpenNotebook}>Open Notebook</button>
        <button onClick={fetchDataAnalysis}>Perform Data Analysis</button>
        <button onClick={sendCodeToServer}>Save</button>
        <button onClick={recieveCodeFromServer}>Reload</button>
        <button className="close-icon" onClick={closeHandler}>
          <IoCloseCircle size={30} />
        </button>
        <div className="code-editor">
          <div className="code-editor__textarea">
            <MultiFileUploader handleFilePaths={handleFilePaths} />
            <textarea
              className="textarea"
              value={code}
              onChange={handleChange}
            />
            <div className="input-container">
              <input
                placeholder="Type your instruction here"
                value={instruction}
                onChange={handleInstruction}
              />
              <button onClick={genAi}>GenAi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
