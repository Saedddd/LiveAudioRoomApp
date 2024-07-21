import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "universal-cookie";

import { PEOPLES_IMAGES } from "../../shared/Images";
import { StreamVideoClient, User } from "@stream-io/video-react-sdk";

interface IFormValues {
  username: string;
  name: string;
}

const SignIn = () => {
  const cookies = new Cookies();

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username in required")
      .matches(/^[a-zA-Z0-9_.@-]+$/, "Invalid"),
    name: yup.string().required("Name in required"),
  });

  const onSubmit: SubmitHandler<IFormValues> = async data => {
    const { username, name } = data;

    const response = await fetch("http://localhost:3001/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        image: PEOPLES_IMAGES[Math.floor(Math.random() * PEOPLES_IMAGES.length)],
      }),
    });

    if (!response.ok) {
      alert("Error creating user");
      return;
    }

    const responseData = await response.json();
    console.log(responseData);

    const user: User = {
      id: username,
      name,
    };

    const myClient = new StreamVideoClient({
      apiKey: "myy5dxg34vmq",
      user,
      token: responseData.token,
    });

    //Истечение токенов
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    cookies.set("token", responseData.token, { expires });
    cookies.set("username", responseData.username, { expires });
    cookies.set("name", responseData.name, { expires });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ resolver: yupResolver(schema) });

  return (
    <section className="flex flex-col gap-10">
      <h1>Welcome to Audio Chat</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center m-auto gap-2">
        <div>
          <label htmlFor="">UserName: </label>
          <input
            {...register("username")}
            type="text"
            placeholder="Type here UserName"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          {errors.username && <p className="text-red-600 m-1">{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="">Name: </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Type here Name"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          {errors.name && <p className="text-red-600 m-1">{errors.name.message}</p>}
        </div>

        <button type="submit" className="btn btn-outline btn-primary">
          Sign in
        </button>
      </form>
    </section>
  );
};

export default SignIn;
