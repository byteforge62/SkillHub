import { useRef } from "react";

const OtpInput = ({ length = 6, value = "", onChange, error = false }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, inputValue) => {
    if (!/^\d*$/.test(inputValue)) return;

    const otp = Array.from({ length }, (_, i) => value?.[i] || "");
    otp[index] = inputValue.slice(-1);

    onChange(otp.join(""));

    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    switch (event.key) {
      case "Backspace":
        if (!value[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case "ArrowLeft":
        if (index > 0) inputRefs.current[index - 1]?.focus();
        break;
      case "ArrowRight":
        if (index < length - 1) inputRefs.current[index + 1]?.focus();
        break;
      default:
        break;
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    onChange(pastedValue);

    const lastIndex = Math.min(pastedValue.length, length) - 1;
    if (lastIndex >= 0) inputRefs.current[lastIndex]?.focus();
  };

  return (
    <div
      className="grid w-full gap-2 sm:gap-3"
      style={{ gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }}
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value?.[index] ?? ""}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          aria-label={`Verification digit ${index + 1}`}
          className={[
            "h-14 min-w-0 rounded-[8px] border border-[color:var(--color-line)] bg-sage/40 py-3.5 text-center font-mono text-[17px] font-semibold text-text-primary",
            "outline-none transition-[border-color,background-color] duration-200",
            "focus:border-primary/60 focus:bg-white",
            error
              ? "border-error/60"
              : "hover:border-primary/30",
          ].join(" ")}
        />
      ))}
    </div>
  );
};

export default OtpInput;
