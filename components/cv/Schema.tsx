import { Location } from "@/types";
import { convertMonth } from "@/utils/helper";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("تکمـیل این مـورد اجبـاری می باشـد."),
  family: yup.string().required("تکمـیل این مـورد اجبـاری می باشـد."),
  jobTitle: yup.string().required("تکمـیل این مـورد اجبـاری می باشـد."),
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
  isMarried: yup
    .mixed()
    .nullable()
    .required("تکمـیل این مـورد اجبـاری می باشـد.")
    .test("is-object", "Invalid value for isMarried", (value) => {
      return (
        value === null ||
        (typeof value === "object" && ("id" in value || "title" in value))
      );
    }),
  militaryServiceId: yup
    .mixed()
    .nullable()
    .test(
      "militaryServiceRequired",
      "تکمـیل این مـورد اجبـاری می باشـد.",
      function (value) {
        const sexId = this.parent.sexId;
        if (sexId && sexId.id === 1) {
          return true; // militaryServiceId can be null when sexId.id is 1
        }

        // Otherwise, it should have a valid value
        return (
          value !== null &&
          typeof value === "object" &&
          ("id" in value || "title" in value)
        );
      }
    ),

  description: yup.string().required("تکمـیل این مـورد اجبـاری می باشـد."),
  email: yup.string().email("آدرس ایمیل معتبر نیست."),
  mobile: yup
    .string()
    .matches(/^09\d{9}$/, "شماره موبایل باید شامل ۱۱ رقم و با ۰۹ شروع شود.")
    .required("تکمـیل این مـورد اجبـاری می باشـد."),
  phone: yup.string(),
  webSiteUrl: yup.string().url("آدرس وب‌سایت معتبر نیست."),
  birthDate: yup
    .object()
    .shape({
      Day: yup.number().typeError("لطفا روز تولد را انتخاب کنید."),
      Month: yup.string().typeError("لطفا ماه تولد را انتخاب کنید."),
      Year: yup.number().typeError("لطفا سال تولد را انتخاب کنید."),
    })
    .test(
      "complete-date",
      "تکمـیل این مـورد اجبـاری می باشـد.",
      function (value) {
        const { Day, Month, Year } = value;
        if (Day === 0 && Month === "" && Year === 0) {
          return false;
        }
        return true;
      }
    )
    .test("complete-day", "تاریخ تولد را کامل کنید.", function (value) {
      const { Month, Year } = this.parent;
      if (Month === "" || Year === 0) {
        return false;
      }
      return true;
    })
    .test("complete-month", "تاریخ تولد را کامل کنید.", function (value) {
      const { Day, Year } = this.parent;
      if (Day === 0 || Year === 0) {
        return false;
      }
      return true;
    })
    .test("complete-year", "تاریخ تولد را کامل کنید.", function (value) {
      const { Day, Month } = this.parent;
      if (Day === 0 || Month === "") {
        return false;
      }
      return true;
    }),
});

export const dateSchema = yup.object().shape({
  jobExperiences: yup.array().of(
    yup
      .object()
      .shape({
        startDate: yup.object().shape({
          Day: yup.number(),
          Month: yup.string(),
          Year: yup.number(),
        }),
        endDate: yup.object().when("stillWorking", (stillWorking, schema) =>
          stillWorking
            ? yup.object().shape({
                Day: yup.number().default(0),
                Month: yup.string().default(""),
                Year: yup.number().default(0),
              })
            : yup.object().shape({
                Day: yup.number(),
                Month: yup.string(),
                Year: yup.number(),
              })
        ),
        stillWorking: yup.boolean(),
      })
      .test(
        "valid-date-range",
        "تاریخ پایان نمی‌تواند قبل از تاریخ شروع باشد.",
        function (value) {
          const startDate = value.startDate;
          const endDate = value.endDate;
          if (!value.stillWorking) {
            //@ts-ignore
            if (startDate.Year > endDate.Year) {
              return false;
              //@ts-ignore
            } else if (endDate.Year === startDate.Year) {
              //@ts-ignore
              if (
                //@ts-ignore
                parseInt(convertMonth[startDate.Month]) >
                //@ts-ignore
                parseInt(convertMonth[endDate.Month])
              ) {
                return false;
              }
            }
          }

          return true;
        }
      )
  ),
});
export const studySchema = yup.object().shape({
  records: yup.array().of(
    yup
      .object()
      .shape({
        stillLearning: yup.boolean(),
        gpa: yup
          .string()
          .nullable() // Allow the GPA to be null (optional)
          .test({
            name: "valid-gpa",
            test: (value) => {
              if (value === null || value === "") {
                // Allow null and empty string
                return true;
              }
              //@ts-ignore
              return /^([0-9]|1[0-9]|20)$/.test(value);
            },
            message: "نمره باید یک عدد بین 0 و 20 باشد.",
          }),
        startDate: yup.object().shape({
          Day: yup.number(),
          Month: yup.string(),
          Year: yup.number(),
        }),
        //@ts-ignore
        endDate: yup.object().when("stillLearning", (stillLearning, schema) => {
          stillLearning[0]
            ? yup.object().shape({
                Day: yup.number().default(0),
                Month: yup.string().default(""),
                Year: yup.number().default(0),
              })
            : yup.object().shape({
                Day: yup.number(),
                Month: yup.string(),
                Year: yup.number(),
              });
        }),
      })
      .test(
        "valid-date-range",
        "تاریخ پایان نمی‌تواند قبل از تاریخ شروع باشد.",
        function (value) {
          //@ts-ignore
          const startDate = value.startDate;
          const endDate = value.endDate;
          if (!value.stillLearning) {
            //@ts-ignore
            if (startDate.Year > endDate.Year) {
              return false;
              //@ts-ignore
            } else if (endDate.Year === startDate.Year) {
              if (
                //@ts-ignore
                parseInt(convertMonth[startDate.Month]) >
                //@ts-ignore
                parseInt(convertMonth[endDate.Month])
              ) {
                return false;
              }
            }
          }

          return true;
        }
      )
  ),
});
export const courseSchema = yup.object().shape({
  records: yup.array().of(
    yup
      .object()
      .shape({
        startDate: yup.object().shape({
          Day: yup.number(),
          Month: yup.string(),
          Year: yup.number(),
        }),
        endDate: yup.object().shape({
          Day: yup.number(),
          Month: yup.string(),
          Year: yup.number(),
        }),
      })
      .test(
        "valid-date-range",
        "تاریخ پایان نمی‌تواند قبل از تاریخ شروع باشد.",
        function (value) {
          //@ts-ignore
          const startDate = value.startDate;
          const endDate = value.endDate;
          //@ts-ignore
          if (startDate.Year > endDate.Year) {
            return false;
            //@ts-ignore
          } else if (endDate.Year === startDate.Year) {
            //@ts-ignore
            if (
              //@ts-ignore
              parseInt(convertMonth[startDate.Month]) >
              //@ts-ignore
              parseInt(convertMonth[endDate.Month])
            ) {
              return false;
            }
          }

          return true;
        }
      )
  ),
});

export default schema;
