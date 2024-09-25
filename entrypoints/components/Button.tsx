import { useEffect, useState } from "react";
import ModalPrompt from "./Prompt";
import AIImage from "../../assets/AI.svg";
import Generate from "../../assets/Vector.svg";
import "./style.css";

const AIButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const checkForTextBox = setInterval(() => {
      const messageInput = document.querySelector(".msg-form__contenteditable");
      if (messageInput) {
        messageInput.addEventListener("focus", handleIcon);
        messageInput.addEventListener("blur", handleIcon);
        clearInterval(checkForTextBox); // Stop polling once the element is located
      }
    }, 2000); // Polling interval of 1 second

    return () => {
      clearInterval(checkForTextBox); // Cleanup on component unmount
    };
  }, []);

  // Method to display the AI icon
  const handleIcon = (event: Event) => {
    const messageInput = document.querySelector(".msg-form__contenteditable");
    if (event.type === "blur") {
      const icon = messageInput?.querySelector(".ai-icon-container");
      if (icon) {
        icon.remove();
      }
      return;
    }
    const iconContainer = document.createElement("div");
    iconContainer.className = "ai-icon-container";
    iconContainer.setAttribute(
      "style",
      "position:absolute; bottom:0; right:10px;"
    );

    const iconElement = document.createElement("img");
    iconElement.src = AIImage;
    iconElement.alt = "AI Icon";
    iconElement.setAttribute(
      "style",
      "width: 40px; height: 40px; cursor:pointer;"
    );

    iconElement.addEventListener("click", () => {
      setIsModalVisible(true);
    });

    iconContainer.appendChild(iconElement);
    messageInput?.appendChild(iconContainer);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <ModalPrompt open={isModalVisible} handleClose={handleClose} />
    </div>
  );
};

export default AIButton;
