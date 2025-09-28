# xdigit.ai Form Wizard

A multi-step form application built with React, TypeScript, Vite, Redux Toolkit, Ant Design, and react-hook-form. Supports internationalization (i18n), RTL layout, high-contrast mode, and OpenAI-powered text generation.

## How to Run the Project

1. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
   The app will be available at [http://localhost:5173/](http://localhost:5173/).

## Setting Up the OpenAI API Key

Some features (e.g., HelpMeWriteButton) require an OpenAI API key.

1. Create a `.env` file in the project root:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
2. Restart the dev server after setting/changing the key.

## Architecture & Decisions

- **Monorepo Structure:** All source code is under `src/`.
- **State Management:** Uses Redux Toolkit (`formSlice.ts`) for form data and navigation.
- **Form Logic:** All form steps share a single `FormProvider` context (react-hook-form) via `FormWizard.tsx`. Step components (`PersonalInfoForm`, `FamilyInfoForm`, `SituationForm`) use `useFormContext` for shared state and validation.
- **Validation:** Zod schemas in `utils/validation.ts` ensure robust validation for each step.
- **UI Library:** Ant Design is used for layout, form controls, and theming.
- **Internationalization:** Uses `react-i18next` for multi-language support. RTL and "Almarai" font are applied automatically for Arabic.
- **Accessibility:** High-contrast mode toggle is available in the header.
- **OpenAI Integration:** The `HelpMeWriteButton` uses OpenAI API for text generation in the Situation step.

## Improvements & Comments

- **Centralized Form State:** Refactored to use a single form context for all steps, improving data flow and validation.
- **Error Handling:** Error boundaries and Ant Design feedback components are used for robust error handling.
- **Modular Components:** Header, Footer, Logo, LanguageSwitcher, and ModeSwitcher are separated for maintainability.
- **RTL & Font:** RTL direction and "Almarai" font are automatically applied for Arabic.
- **Extensibility:** Easily add new steps or fields by updating the steps array and validation schemas.

---

For more details, see comments in source files such as `FormWizard.tsx`, `formSlice.ts`, and each form step component.
