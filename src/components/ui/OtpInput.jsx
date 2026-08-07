import { useRef } from "react";

const OtpInput = ({
  length = 6,
  value = "",
  onChange,
}) => {
  const inputRefs = useRef([]);

  const handleChange = (index, inputValue) => {
    if (!/^\d*$/.test(inputValue)) return;

    const otp = Array.from(
      { length },
      (_, i) => value?.[i] || ""
    );

    otp[index] = inputValue.slice(-1);

    const newValue = otp.join("");

    onChange(newValue);

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
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;

      case "ArrowRight":
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
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

    const lastIndex = Math.min(
      pastedValue.length,
      length
    ) - 1;

    if (lastIndex >= 0) {
      inputRefs.current[lastIndex]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-3">
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
          onChange={(event) =>
            handleChange(index, event.target.value)
          }
          onKeyDown={(event) =>
            handleKeyDown(index, event)
          }
          onPaste={handlePaste}
          aria-label={`OTP Digit ${index + 1}`}
          className="
            h-14
            w-14
            rounded-xl
            border
            border-border
            bg-surface
            text-center
            text-xl
            font-semibold
            outline-none
            transition-all
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        />
      ))}
    </div>
  );
};

export default OtpInput;