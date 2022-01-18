import { FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

import styles from "./styles.module.scss";

export function SignInButton() {
  const isLoggedInUser = false;

  return isLoggedInUser ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04d361" />
      Thiago Moura
      <FiX color="#737388" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
