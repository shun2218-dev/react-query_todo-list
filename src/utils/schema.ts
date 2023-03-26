import { z } from "zod";

const passRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{6,24}$/
);

const schema = z
  .object({
    email: z.string().nonempty("Required Field.").email("Invalid Email"),
    password: z
      .string()
      .nonempty("Required Field.")
      .min(8, "Password must be at least 6 characters.")
      .regex(
        passRegex,
        "Passwords must contain at least one lowercase, one uppercase, one number, and one symbol (.? /-)."
      ),
    confirmation: z
      .string()
      .nonempty("Required Field.")
      .min(1, "Enter your password for confirmation."),
  })
  .superRefine(({ email, password, confirmation }, ctx) => {
    if (password !== confirmation) {
      ctx.addIssue({
        path: ["confirmation"],
        code: "custom",
        message: "Password does not match.",
      });
    }
  });

type FormData = z.infer<typeof schema>;

export { schema };
export type { FormData };
