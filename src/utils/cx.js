// src/utils/cx.js
export default function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}