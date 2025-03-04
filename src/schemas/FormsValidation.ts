import * as z from "zod";

const createAccountFormSchema = z
  .object({
    firstName: z.string().nonempty({
      message: "First Name is required.",
    }),
    lastName: z.string().nonempty({
      message: "First Name is required.",
    }),
    email: z
      .string()
      .nonempty({
        message: "Email is required.",
      })
      .email({
        message: "Invalid email.",
      }),
    phone: z.string().nonempty({
      message: "Phone number is required.",
    }),
    role: z.string().nonempty({ message: "Select role" }),
    password: z
      .string()
      .nonempty({
        message: "Password is required.",
      })
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one numeric digit")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .nonempty({
        message: "Confirm Password is required.",
      })
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginAccountFormSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "Email is required.",
    })
    .email({
      message: "Invalid email.",
    }),
  password: z
    .string()
    .nonempty({
      message: "Password is required.",
    })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one numeric digit")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const emailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required." })
    .email({ message: "Invalid email." }),
});

const otpSchema = z.object({
  email: z.string(),
  otp: z
    .string()
    .nonempty({ message: "OTP is required." })
    .length(6, "OTP must be exactly 6 digits"),
});

const resetPasswordSchema = z
  .object({
    email: z.string(),
    newPassword: z
      .string()
      .nonempty({ message: "Please enter your new password" })
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one numeric digit")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters.")
    .max(30, "First name must not be longer than 30 characters."),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters.")
    .max(30, "Last name must not be longer than 30 characters."),
  email: z.string().email("Invalid email format."),
  countryCode: z.string().optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  dateOfBirth: z.string().nullable().optional(),
  cnic: z
    .string()
    .min(13, "CNIC must be 13 digits")
    .max(13, "CNIC must be 13 digits")
    .nullable()
    .optional(),
  gender: z.enum(["Male", "Female", "Other"]).nullable().optional(),
  address: z
    .string()
    .max(255, "Address cannot exceed 255 characters")
    .nullable()
    .optional(),
  tehsil: z.string().nullable().optional(),
  district: z.string().nullable().optional(),
  province: z.string().nullable().optional(),
  role: z.string().min(2, "Role is required."),
  verified: z.boolean().optional(),
  profileImg: z.string().url("Invalid profile image URL").nullable().optional(),
});

const projectFormSchema = z.object({
  title: z.string().nonempty({ message: "Project Title is required." }),
  trade: z.string().nonempty({ message: "Trade selection is required." }),
  startDate: z.string().nonempty({ message: "Start Date is required." }),
  endDate: z.string().nonempty({ message: "End Date is required." }),
});

export {
  createAccountFormSchema,
  loginAccountFormSchema,
  emailSchema,
  otpSchema,
  resetPasswordSchema,
  profileFormSchema,
  projectFormSchema,
};
