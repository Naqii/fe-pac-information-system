import { Button, Card, CardBody, cn, Input, Spinner } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLogin from "./useLogin";
import { Controller } from "react-hook-form";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();
  return (
    <div className="flex w-full items-center justify-center lg:flex-row lg:gap-20">
      {/* Wrapper Card */}
      <div className="flex w-[800px] rounded-xl">
        {/* Left Side - Background Hijau */}
        <div className="hidden w-1/2 rounded-xl bg-[#006d63] lg:flex" />
        <Card className="flex w-full lg:w-1/2">
          <CardBody className="p-6">
            <h2 className="mb-4 text-2xl font-bold text-[#006d63]">Login</h2>
            {errors.root && (
              <p className="text-danger mb-2 font-medium">
                {errors?.root?.message}
              </p>
            )}
            <form
              className={cn(
                "flex flex-col",
                Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
              )}
              onSubmit={handleSubmit(handleLogin)}
            >
              <Controller
                name="identifier"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email / Username"
                    type="text"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.identifier !== undefined}
                    errorMessage={errors.identifier?.message}
                    classNames={{
                      inputWrapper: "border-[#006d63]",
                    }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Password"
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                    classNames={{
                      inputWrapper: "border-[#006d63]",
                    }}
                    endContent={
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                          tabIndex={-1}
                        >
                          {isVisible ? (
                            <FaEye className="text-default-400 pointer-events-none text-xl" />
                          ) : (
                            <FaEyeSlash className="text-default-400 pointer-events-none text-xl" />
                          )}
                        </button>
                      </span>
                    }
                  />
                )}
              />
              <Button
                color="primary"
                className="bg-[#006d63] text-white hover:bg-[#00564f]"
                size="lg"
                type="submit"
              >
                {isPendingLogin ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
