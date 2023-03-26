import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useMutation } from "react-query";
import { auth } from "../utils/firebase";
import { useForm, zodResolver } from "@mantine/form";
import { schema } from "../utils/schema";
import { useNotification } from "./useNotification";

const useMutateAuth = () => {
  const { successNotification, errorNotification } = useNotification();
  const { values, reset, getInputProps, onSubmit } = useForm({
    validateInputOnChange: true,
    validate: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
      confirmation: "",
    },
  });
  const getValues = () => {
    return {
      email: values.email,
      password: values.password,
      confirmation: values.confirmation,
    };
  };
  const loginMutation = useMutation(
    async () => {
      try {
        const { email, password } = getValues();
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return signInWithEmailAndPassword(auth, email, password);
          })
          .catch((e: unknown) => {
            // Handle Errors here.
            if (e instanceof Error) {
              throw new Error(e.message);
            }
          });
      } catch (e: unknown) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      }
    },
    {
      onSuccess: () => {
        successNotification({
          title: "Signed in successfully",
          message: "Welcomback back!",
        });
      },
      onError: (error: unknown) => {
        errorNotification(error, {
          title: "Your sign in attempt has failed",
        });
        reset();
      },
    }
  );

  const registMutation = useMutation(
    async () => {
      console.log("regist");
      try {
        const { email, password } = getValues();
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        return user.uid;
      } catch (e: unknown) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      }
    },
    {
      onSuccess: () => {
        successNotification({
          title: "Signed up successfully",
          message: "Thank you registering!",
        });
      },
      onError: (error: unknown) => {
        errorNotification(error, {
          title: "Failed to Login",
        });
        reset();
      },
    }
  );

  return {
    getInputProps,
    reset,
    onSubmit,
    loginMutation,
    registMutation,
  };
};

export { useMutateAuth };
