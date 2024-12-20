import { BaseModal } from "../../../components/Base/BaseModal";
import { useGroupsStore } from "../store/groups.store";
import { FormExam } from "./FormExam";

export function ModalExam() {
  const { toggleForm, showForm } = useGroupsStore();
  return (
    <BaseModal
      isOpen={showForm}
      onOpenChange={toggleForm}
      title={"Nuevo examen"}
      size="4xl"
    >
      <FormExam />
    </BaseModal>
  );
}
