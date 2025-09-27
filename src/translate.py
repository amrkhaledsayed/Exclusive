import json
import os
from deep_translator import GoogleTranslator

# نجيب المسار الحقيقي للملف translate.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE_DIR, "en.json"), "r", encoding="utf-8") as f:
    data = json.load(f)

translator = GoogleTranslator(source="en", target="ar")

def translate_values(obj):
    if isinstance(obj, dict):
        return {k: translate_values(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [translate_values(v) for v in obj]
    elif isinstance(obj, str):
        try:
            return translator.translate(obj)
        except Exception:
            return obj
    else:
        return obj

translated_data = translate_values(data)

with open(os.path.join(BASE_DIR, "ar.json"), "w", encoding="utf-8") as f:
    json.dump(translated_data, f, ensure_ascii=False, indent=2)

print("تم إنشاء ملف ar.json بالترجمة العربية ✅")
