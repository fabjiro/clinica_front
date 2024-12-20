import { RolEnum } from "../../../../enum/rol/rol.enum";
import { useAddUser, useUpdateUser } from "../query/user.query";
import { userSchemaValidation } from "../schemas/user.schema";
import { useFormik } from "formik";
import { useUserStore } from "../store/user.store";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
import { IUserReqDto } from "../../../../domain/dto/request/user/user.req.dto";

export function useFormikUser() {
  const { status: addUserStatus, mutate } = useAddUser();
  const { status: updateUserStatus, mutate: mutateUpdate } = useUpdateUser();

  const { modeForm, user } = useUserStore();

  const isCreateMode = modeForm === MODEFORMENUM.CREATE;

  const initialValues: IUserReqDto = isCreateMode
    ? {
        Name: "",
        Email: "",
        Rol: RolEnum.CUSTOMER,
      }
    : {
        Name: user?.name,
        Rol: user?.rol?.id,
      };

  const {
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    submitForm: submitForm,
    errors,
    values,
  } = useFormik<IUserReqDto>({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: () => userSchemaValidation(),
    onSubmit: (values) => {
      if (isCreateMode) {
        mutate({
          Name: values.Name!,
          Email: values.Email!,
          Rol: values.Rol,
          Avatar: values.Avatar,
        });
      } else {
        mutateUpdate({
          Id: user?.id!,
          Name: values.Name!,
          Rol: values.Rol,
          Avatar: values.Avatar,
        });
      }
    },
  });

  return {
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    submitForm,
    errors,
    values,
    addUserStatus,
    updateUserStatus,
  };
}
