import { Button } from "@nextui-org/react";
import { BaseScreen } from "../BaseScreen";
import { ImFilesEmpty } from "react-icons/im";
import { useGroupsStore } from "./store/groups.store";
import { ModalExam } from "./components/ModalExam";





export function ExamScreen() {
    
    const {toggleForm: toggleFormGroup} = useGroupsStore();

    return (
    <>
    <BaseScreen
        titlePage="Exámenes"
        actions={
            <Button
              onClick={() => {
                toggleFormGroup();
              }}
              startContent={<ImFilesEmpty />}
              color="success"
            >
              Examenes
            </Button>
        }
    >
    </BaseScreen>
    
    <ModalExam />
    </>
);
}