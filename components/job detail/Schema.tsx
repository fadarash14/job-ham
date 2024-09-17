import { Location } from "@/types";
import { convertMonth } from "@/utils/helper";
import * as yup from "yup";
import { wordCount } from "@/utils/helper";
const schema = yup.object().shape({
  sexId: yup
    .mixed()
    .nullable()
    .required("تکمـیل این مـورد اجبـاری می باشـد.")
    .test("is-object", "Invalid value for sexId", (value) => {
      return (
        value === null ||
        (typeof value === "object" && ("id" in value || "title" in value))
      );
    }),
  typeCooperationId: yup
    .mixed()
    .nullable()
    .required("تکمـیل این مـورد اجبـاری می باشـد.")
    .test("is-object", "Invalid value for sexId", (value) => {
      return (
        value === null ||
        (typeof value === "object" && ("id" in value || "title" in value))
      );
    }),

  workDay: yup.string().required("تکمـیل این مـورد اجبـاری می باشـد."),
  businessTrips: yup.string().required("تکمـیل این مـورد اجبـاری می باشـد."),
  salaryId: yup
    .mixed()
    .nullable()
    .required("تکمـیل این مـورد اجبـاری می باشـد.")
    .test("is-object", "Invalid value for salaryId", (value) => {
      return (
        value === null ||
        (typeof value === "object" && ("id" in value || "title" in value))
      );
    }),
  organizationPostId: yup
    .mixed()
    .nullable()
    .required("تکمـیل این مـورد اجبـاری می باشـد.")
    .test("is-object", "Invalid value for organizationPostId", (value) => {
      return (
        value === null ||
        (typeof value === "object" && ("id" in value || "title" in value))
      );
    }),
  advantageIds: yup.array().min(1, "تکمـیل این مـورد اجبـاری می باشـد."),
  jobDescription: yup
    .string()
    .required("تکمـیل این مـورد اجبـاری می باشـد.")
    .test("at-least-10-word", "حداقل 10 کلمه", (value) => {
      const count = wordCount(value);
      return count >= 10;
    }),
  skillDescription: yup
    .string()
    .required("تکمـیل این مـورد اجبـاری می باشـد.")
    .test("at-least-10-word", "حداقل 10 کلمه", (value) => {
      const count = wordCount(value);
      return count >= 10;
    }),
  experienceId: yup
    .mixed()
    .nullable()
    .required("تکمـیل این مـورد اجبـاری می باشـد.")
    .test("is-object", "Invalid value for experienceId", (value) => {
      return (
        value === null ||
        (typeof value === "object" && ("id" in value || "title" in value))
      );
    }),
  fieldStudyId: yup
    .mixed()
    .nullable()
    .required("تکمـیل این مـورد اجبـاری می باشـد.")
    .test("is-object", "Invalid value for fieldStudyId", (value) => {
      return (
        value === null ||
        (typeof value === "object" && ("id" in value || "title" in value))
      );
    }),
    gradeId:yup
    .mixed()
    .nullable()
    .required("تکمـیل این مـورد اجبـاری می باشـد.")
    .test("is-object", "Invalid value for gradeId", (value) => {
      return (
        value === null ||
        (typeof value === "object" && ("id" in value || "title" in value))
      );
    }),
    ageMinId:yup
    .mixed()
    .nullable()
    .required("تکمـیل این مـورد اجبـاری می باشـد.")
    .test("is-object", "Invalid value for ageMinId", (value) => {
      return (
        value === null ||
        (typeof value === "object" && ("id" in value || "title" in value))
      );
    }),
    ageMaxId:yup
    .mixed()
    .nullable()
    .required("تکمـیل این مـورد اجبـاری می باشـد.")
    .test("is-object", "Invalid value for ageMaxId", (value) => {
      return (
        value === null ||
        (typeof value === "object" && ("id" in value || "title" in value))
      );
    }),
    // languages: yup.array().min(1, "تکمـیل این مـورد اجبـاری می باشـد."),
    // skills: yup.array().min(1, "تکمـیل این مـورد اجبـاری می باشـد."),
});

export default schema;
