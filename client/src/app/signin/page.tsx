"use client";

// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash, BsArrowLeft } from "react-icons/bs";

import { useAxios } from "@/hooks/axios.hook";
import Loading from "../loading";
import Image from "next/image";
import Link from "next/link";

// ||||||||||||||||||||||||||||| SignInPage Component ||||||||||||||||||||||||||||||||||||

interface ISignInPageProps {}
type FormData = {
  email: string;
  password: string;
};

const SignInPage: FC<ISignInPageProps> = ({}) => {
  // Hooks
  const [page_loading, setPageLoading] = useState(true);
  const [show_pwd, setShowPwd] = useState(false);
  const [req_err, setReqErr] = useState("");
  const router = useRouter();

  // Use Form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Functions
  const verifyAuth = async () => {
    try {
      const res = await useAxios
        .get("/members/current", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.status === 200) {
            router.replace("/");
          } else {
            setPageLoading(false);
          }
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  };
  const handleFormSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();

    await useAxios
      .post("/members/signin", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data.status === 200) {
          router.replace("/");
        }
        console.error(res.data.message);
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  });

  // Effects
  useEffect(() => {
    verifyAuth();
  }, []);

  // Return
  return page_loading ? (
    <Loading />
  ) : (
    <main className="signin-page">
      <div aria-label="filter" className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/images/auth.jpg"
          alt="logo"
          fill
          className="object-center object-cover"
        />
      </div>
      <div className="page-container">
        <section>
          <div className="text-sm font-bold text-gray-100 mb-4">
            <a href="/" className="flex items-center text-start gap-x-2">
              <BsArrowLeft /> <p>Retour en arrière</p>
            </a>
          </div>
          <h1>Connectez-vous ici</h1>
          <h3>Vous pouvez vous connecter via le formulaire ci-dessous:</h3>
        </section>
        <form>
          <section aria-label="inputs">
            <div className="input-content">
              <label htmlFor="email">Adresse Email</label>
              <input
                type="email"
                placeholder="Entrer votre adresse email"
                {...register("email", {
                  required: "Veuillez entrer votre email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Veuillez entrer une adresse email valide",
                  },
                  value: "",
                  onChange: (e) => setValue("email", e.target.value),
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </div>
            <div className="input-content">
              <label htmlFor="email">Mot de passe</label>
              <div aria-label="field" className="relative">
                <input
                  type={show_pwd ? "text" : "password"}
                  placeholder="Entrer un mot de passe"
                  {...register("password", {
                    required: "Veuillez entrer un mot de passe",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Veuillez entrer un mot de passe correct (6 caractères, 1 majuscule, 1 minuscule, 1 chiffre)",
                    },
                    value: "",
                    onChange: (e) => setValue("password", e.target.value),
                  })}
                />
                {show_pwd ? (
                  <BsEyeSlash
                    className="show_pwd"
                    onClick={() => setShowPwd(!show_pwd)}
                  />
                ) : (
                  <BsEye
                    className="show_pwd"
                    onClick={() => setShowPwd(!show_pwd)}
                  />
                )}
              </div>
              <p className="error">{errors.password?.message}</p>
            </div>
          </section>
          <section className="form_button">
            <button type="button" onClick={handleFormSubmit}>
              Se Connecter
            </button>
            <p>{req_err}</p>
          </section>
          <div className="flex items-center justify-center text-sm font-bold text-gray-100 mt-4">
            <a href="/signup">Pas de compte ? inscrivez-vous ici</a>
          </div>
        </form>
      </div>
    </main>
  );
};
export default SignInPage;
