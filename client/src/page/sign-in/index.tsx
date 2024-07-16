const SignIn = () => {
  return (
    <section className="flex flex-col gap-10">
      <h1>Welcome to Audio Chat</h1>
      <form action="" className="flex flex-col justify-center m-auto gap-4">
        <div className="">
          <label htmlFor="">UserName: </label>
          <input
            type="text"
            placeholder="Type here UserName"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <div className="">
          <label htmlFor="">Name: </label>
          <input
            type="text"
            placeholder="Type here Name"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <button type="submit" className="btn btn-outline btn-primary">
          Sign in
        </button>
      </form>
    </section>
  );
};

export default SignIn;
