import { BaseModal } from "../../../components/Base/BaseModal";
import { usePatientStore } from "../store/patient.store";
import { FormPatient } from "./FormPatient";

export function ModalPatient() {
  const { toggleForm, showForm } = usePatientStore();
  return (
    <BaseModal
      isOpen={showForm}
      onOpenChange={toggleForm}
      title="Agregar Paciente"
      size="4xl"
    >
      <FormPatient />
    </BaseModal>
  );
}
