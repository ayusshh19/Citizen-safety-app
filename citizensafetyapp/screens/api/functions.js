export async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/elftsdmr/malware-url-detect",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

export async function Smsclassifier(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mariagrandury/roberta-base-finetuned-sms-spam-detection",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }