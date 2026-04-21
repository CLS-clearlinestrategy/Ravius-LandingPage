import { useReducer } from "react";
import { siteConfig } from "@/config/siteConfig";
import RevealBlock from "@/components/core/RevealBlock";
import SplitText from "@/components/core/SplitText";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { BackgroundGif } from "@/components/core/BackgroundGif";
import { SectionFade } from "@/components/core/SectionFade";

// URL do seu Webhook
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwnNmTr3Bu5HQq3m2czPHEhaRDYXAREv9LPZzKeTLmYAZ__za8y_Xax-070gbHynh86/exec";

interface FormState {
  values: { name: string; email: string; message: string };
  errors: Partial<Record<"name" | "email" | "message", string>>;
  status: "idle" | "submitting" | "success" | "error";
}

type FormAction =
  | { type: "SET_FIELD"; field: keyof FormState["values"]; value: string }
  | { type: "SET_ERRORS"; errors: FormState["errors"] }
  | { type: "SUBMIT" }
  | { type: "SUCCESS" }
  | { type: "ERROR" }
  | { type: "RESET" };

const initialState: FormState = {
  values: { name: "", email: "", message: "" },
  errors: {},
  status: "idle",
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors, status: "idle" };
    case "SUBMIT":
      return { ...state, status: "submitting", errors: {} };
    case "SUCCESS":
      return { ...initialState, status: "success" };
    case "ERROR":
      return { ...state, status: "error" };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const ContactForm = () => {
  const { contact } = siteConfig;
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fieldErrors: FormState["errors"] = {};
    const { name, email, message } = state.values;

    // Validações
    if (!name.trim()) fieldErrors.name = "Nome é obrigatório";
    if (!email.trim()) {
      fieldErrors.email = "E-mail é obrigatório";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      fieldErrors.email = "E-mail inválido";
    }
    if (!message.trim()) fieldErrors.message = "Mensagem é obrigatória";

    if (Object.keys(fieldErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors: fieldErrors });
      return;
    }

    dispatch({ type: "SUBMIT" });

    try {
      // Envio para o Apps Script
      // Usamos mode: "no-cors" para evitar erros de redirecionamento do Google
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: name,
          email: email,
          mensagem: message,
        }),
      });

      dispatch({ type: "SUCCESS" });
      toast.success(contact.successMessage);

    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      dispatch({ type: "ERROR" });
      toast.error("Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
    }
  };

  const fieldKeys = ["name", "email", "message"] as const;

  return (
    <section id="contact" className="relative py-20 md:py-32 min-h-screen flex items-center justify-center bg-background px-4 md:px-8 overflow-hidden">
      <BackgroundGif
        gifUrl="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGw3ejN2MWUwaXBqZXloc3NncWs0a29nNW9pc2QyZjNxeGxpZTAydiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8w61HSu6xQjoa2NzKN/giphy.gif"
        className="z-0"
        blur="blur-2xl"
        overlayColor="bg-black/40"
      />
      <SectionFade position="top" color="hsl(var(--background))" height="150px" />

      <RevealBlock className="w-full max-w-[1100px] mx-auto rounded-3xl overflow-hidden flex flex-col md:flex-row glass-strong shadow-2xl relative z-10">

        {/* Left Column: Image Area */}
        <div className="relative w-full md:w-[45%] min-h-[400px] md:min-h-full flex flex-col justify-center p-8 md:p-14 overflow-hidden">
          <BackgroundGif
            gifUrl="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGw3ejN2MWUwaXBqZXloc3NncWs0a29nNW9pc2QyZjNxeGxpZTAydiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8w61HSu6xQjoa2NzKN/giphy.gif"
            className="z-0"
            blur="blur-sm"
            overlayColor="bg-black/40"
          />
          <div className="relative z-10">
            <SplitText
              text={contact.title}
              tag="h2"
              splitType="words"
              delay={40}
              duration={1}
              ease="power3.out"
              from={{ opacity: 0, x: -30 }}
              to={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight"
              textAlign="left"
            />
            <p className="text-white/80 text-base md:text-lg max-w-sm">
              {contact.subtitle}
            </p>
          </div>
        </div>

        {/* Right Column: Form Area */}
        <div className="w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-center bg-background/50 backdrop-blur-md">
          <div className="max-w-[420px] w-full mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {fieldKeys.map((key) => {
                const field = contact.fields[key];
                const isTextarea = key === "message";
                const Component = isTextarea ? "textarea" : "input";

                return (
                  <div key={key} className="space-y-2">
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-foreground"
                    >
                      {field.label}
                    </label>
                    <Component
                      id={key}
                      name={key}
                      placeholder={field.placeholder}
                      value={state.values[key]}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_FIELD",
                          field: key,
                          value: (e.target as HTMLInputElement | HTMLTextAreaElement).value,
                        })
                      }
                      className={`w-full rounded-lg bg-background/50 border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${state.errors[key] ? "border-destructive" : "border-border"
                        } ${isTextarea ? "min-h-[120px] resize-none" : ""}`}
                    />
                    {state.errors[key] && (
                      <p className="text-xs text-destructive">{state.errors[key]}</p>
                    )}
                  </div>
                );
              })}

              <button
                type="submit"
                disabled={state.status === "submitting"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all hover:shadow-[0_0_30px_hsla(145,65%,52%,0.25)]"
              >
                {state.status === "submitting" ? (
                  <span className="inline-block w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {contact.submitLabel}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </RevealBlock>
      <SectionFade position="bottom" color="hsl(var(--background))" height="150px" />
    </section>
  );
};

export default ContactForm;