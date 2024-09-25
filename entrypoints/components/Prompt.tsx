import React, { useState, useCallback } from "react";
import VectorIcon from "../../assets/Vector.svg";
import InsertIcon from "../../assets/Insert.svg";
import RegenerateIcon from "../../assets/Regenerate.svg";
import "./style.css";

interface IPrompts {
  role: string;
  message: string;
}

const PromptModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [prompts, setPrompts] = useState<IPrompts[]>([]);
  const [userPrompt, setUserPrompt] = useState<string>("");

  const generateResponse = useCallback((prompt: string): IPrompts => {
    return {
      role: "system",
      message:
        "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
    };
  }, []);

  const handleGenerate = useCallback(() => {
    if (userPrompt.trim()) {
      const userMessage: IPrompts = { role: "user", message: userPrompt };
      const aiResponse = generateResponse(userPrompt);
      setPrompts((prev) => [...prev, userMessage, aiResponse]);
      setUserPrompt("");
    }
  }, [userPrompt, generateResponse]);

  const handleInsert = useCallback(() => {
    const textBox = document.querySelector(".msg-form__contenteditable");
    const placeholder = document.querySelector(".msg-form__placeholder");
    const sendBtn = document.querySelector(".msg-form__send-button");
    placeholder?.classList.remove("msg-form__placeholder");
    if(sendBtn) sendBtn.disabled = false;
    if (textBox instanceof HTMLElement) {
      const lastMessage = prompts.at(-1)?.message || "";
      textBox.innerHTML = `<p>${lastMessage}</p>`;
    }
    setUserPrompt("");
    setPrompts([]);
    handleClose();
  }, [prompts, handleClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {prompts.map((prompt, index) => (
          <div key={index} className={`prompt-message ${prompt.role}`}>
            {prompt.message}
          </div>
        ))}
        <input
          type="text"
          placeholder="Your prompt"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className="prompt-input"
          style={{ outline: "none" }}
        />

        <div className="button-container">
          {prompts.length === 0 ? (
            <button className="generate-button" onClick={handleGenerate}>
              <img src={VectorIcon} alt="icon" className="button-icon" />
              <span>Generate</span>
            </button>
          ) : (
            <>
              <button className="insert-button" onClick={handleInsert}>
                <img src={InsertIcon} alt="icon" className="button-icon" />
                <span>Insert</span>
              </button>
              <button className="regenerate-button" onClick={handleGenerate}>
                <img src={RegenerateIcon} alt="icon" className="button-icon" />
                <span>Regenerate</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
