import * as z from "zod";

const searchLocationSchema = z.object({
  category: z.enum(["province", "district", "tehsil"], {
    errorMap: () => ({
      message: "Category is required",
    }),
  }),
  value: z.string().nonempty({
    message: "Select from Tehsil, District Or Province",
  }),
});

export { searchLocationSchema };
