import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Map } from "./map";

interface ModalBasicProps {
  title: string;
  content: string;
  isShowing: boolean;
  onClose: () => void;
}

export default function Modal({
  title,
  content,
  isShowing,
  onClose,
}: ModalBasicProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (isShowing) {
        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = wrapperRef.current;
        if (modal) {
          const firstFocusableElement = modal.querySelectorAll(
            focusableElements
          )[0] as HTMLElement;
          const focusableContent = modal.querySelectorAll(focusableElements);
          const lastFocusableElement = focusableContent[
            focusableContent.length - 1
          ] as HTMLElement;

          let isTabPressed = event.key === "Tab" || event.keyCode === 9;

          if (isTabPressed) {
            if (event.shiftKey) {
              if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
              }
            } else {
              if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                event.preventDefault();
              }
            }
          }
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShowing, onClose]);

  useEffect(() => {
    let html = document.querySelector("html");
    if (html) {
      html.style.overflowY = isShowing ? "hidden" : "visible";
    }

    if (isShowing && wrapperRef.current) {
      const focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const firstFocusableElement = wrapperRef.current.querySelectorAll(
        focusableElements
      )[0] as HTMLElement;
      firstFocusableElement.focus();
    }
  }, [isShowing]);

  if (!isShowing) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
      aria-modal="true"
      tabIndex={-1}
      role="dialog"
    >
      <div
        ref={wrapperRef}
        className="flex max-h-[90vh] w-11/12 max-w-xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
        id="modal"
        role="document"
      >
        <header className="flex items-center gap-4">
          <h3 className="flex-1 text-xl font-medium text-slate-700">{title}</h3>
          <button
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide text-gray-500 transition duration-300 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-200 focus:text-gray-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-gray-300 disabled:shadow-none disabled:hover:bg-transparent"
            aria-label="close dialog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 relative only:-mx-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>
        <div className="flex-1 overflow-auto">
          <h4 className="text-lg mb-4">
            Where is the <b>{content}</b>?
          </h4>
          <div className="border border-slate-300 p-2 bg-slate-100 rounded-md">
            <Map lat={39.924104242094636} lng={32.86481499793449} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
