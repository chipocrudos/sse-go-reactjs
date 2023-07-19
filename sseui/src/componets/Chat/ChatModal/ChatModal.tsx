import { useChat } from "../ChatContext"

import { ImCross } from "react-icons/im"

import { ChatModalProps } from "."
import styles from "./ChatModal.module.css"

export const ChatModal = ({children}: ChatModalProps) => {
    const {isModalActive, toggleModal} = useChat()

  return (
    <div className={`${styles.modal}`} style={{display: `${isModalActive ? "block" : "none"}`}}>
        <div className={`${styles.modalContent}`}>

        <div className={`${styles.close}`}
            onClick={() => toggleModal()}
        >
            <ImCross />
        </div>
        <p>
            {children}
        </p>
        </div>

    </div>
  )
}
