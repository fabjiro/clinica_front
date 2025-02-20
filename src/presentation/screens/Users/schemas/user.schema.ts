import * as Yup from "yup";
import { useUserStore } from "../store/user.store";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";

// Validation schema
export const userSchemaValidation = () => {
  const useUserState = useUserStore.getState();
  const isCreateMode = useUserState.modeForm === MODEFORMENUM.CREATE;

  return Yup.object().shape({
    Name: Yup.string().required("El nombre es requerido"),
    Rol: Yup.string().required("El Rol es requerido"),
    ...(isCreateMode && {
      Email: Yup.string()
        .email("Debe ser un correo valido")
        .required("El correo es requerido"),
        
        Password: Yup.string().required("La contraseña es requerida"),
    }),
    
  });
};
